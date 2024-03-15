import { createEffect, createEvent, createStore, sample } from 'effector';

import { type RuntimeEvents } from '../../../shared/types';
import { CHROME_RUNTIME_EVENT, RESPONSE_MINI_APP_ACCESS_TOKEN } from '../../../shared/const';
import { assertUnreachable } from '../../../shared/utils/assertUnreachable';
import { $currentTabId } from '../../../widgets/Popup';
import { openSnackbar } from '../../../shared/components/Snackbar/model/store';
import { $currentMiniAppName } from '../../AuthorizationMiniApp/model/store';

import {
	type GetAccessTokenParams,
	type MiniAppAccessTokenError,
	type MiniAppAccessTokenSuccess,
	type ResponseMiniAppAccessToken,
} from './types';

export const configureMiniApp = createEvent();

export const $configMiniAppError = createStore<number | null>(null);

export const getAccessTokenMiniAppFx = createEffect<
	GetAccessTokenParams,
	MiniAppAccessTokenSuccess,
	MiniAppAccessTokenError
>(
	async ({ miniAppName }) =>
		new Promise<MiniAppAccessTokenSuccess>((resolve, reject) => {
			chrome.runtime.sendMessage<RuntimeEvents<GetAccessTokenParams>, ResponseMiniAppAccessToken>(
				{ event: CHROME_RUNTIME_EVENT.miniAppAccessToken, payload: { miniAppName } },
				(response) => {
					switch (response.event) {
						case RESPONSE_MINI_APP_ACCESS_TOKEN.miniAppAccessToken: {
							resolve(response);

							break;
						}

						case RESPONSE_MINI_APP_ACCESS_TOKEN.miniAppAccessTokenError: {
							reject(response);

							break;
						}

						default:
							assertUnreachable(response);
					}
				},
			);
		}),
);

export const accessTokenDoneFx = createEffect(
	({ tabId, response }: { tabId: number; response: MiniAppAccessTokenSuccess }) => {
		chrome.tabs.sendMessage(tabId, response);
	},
);

sample({
	clock: configureMiniApp,
	source: $currentMiniAppName,
	fn: (miniAppName) => ({ miniAppName }),
	target: getAccessTokenMiniAppFx,
});

sample({
	clock: getAccessTokenMiniAppFx.doneData,
	source: $currentTabId,
	fn: (tabId, response) => ({ tabId: tabId as number, response }),
	target: accessTokenDoneFx,
});

sample({
	clock: getAccessTokenMiniAppFx.done,
	fn: () => ({ text: 'Токен успешно установлен', severity: 'success' }) as const,
	target: openSnackbar,
});

sample({
	clock: getAccessTokenMiniAppFx.fail,
	fn: () => ({ text: 'Не удалось установить токен', severity: 'error' }) as const,
	target: openSnackbar,
});

export const $isAccessTokenLoading = getAccessTokenMiniAppFx.pending;
