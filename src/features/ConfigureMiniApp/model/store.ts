import { createEffect, createEvent, createStore, sample } from 'effector';
import { toast } from 'react-toastify';

import { type RuntimeEvents } from '../../../shared/types';
import { CHROME_RUNTIME_EVENT, RESPONSE_MINI_APP_ACCESS_TOKEN } from '../../../shared/const';
import { assertUnreachable } from '../../../shared/utils/assertUnreachable';

import {
	type MiniAppAccessTokenError,
	type MiniAppAccessTokenSuccess,
	type ResponseMiniAppAccessToken,
} from './types';

const DEFAULT_API_URL = '';

export const configureMiniApp = createEvent();

export const $configMiniAppError = createStore<number | null>(null);

const getAccessTokenMiniAppFx = createEffect<
	void,
	MiniAppAccessTokenSuccess,
	MiniAppAccessTokenError
>(
	async () =>
		new Promise<MiniAppAccessTokenSuccess>((resolve, reject) => {
			chrome.runtime.sendMessage<RuntimeEvents, ResponseMiniAppAccessToken>(
				CHROME_RUNTIME_EVENT.miniAppAccessToken,
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

const updateLocalStorageFx = createEffect(
	({ miniAppName, accessToken }: MiniAppAccessTokenSuccess) => {
		const apiHostKey = `${miniAppName}:api_host`;
		const accessTokenKey = `${miniAppName}:access_token`;

		localStorage.setItem(apiHostKey, DEFAULT_API_URL);
		localStorage.setItem(accessTokenKey, accessToken);
	},
);

sample({
	clock: configureMiniApp,
	target: getAccessTokenMiniAppFx,
});

sample({
	clock: getAccessTokenMiniAppFx.doneData,
	fn: (response) => {
		// FIXME: note pure fix
		toast.success(`MiniApp: ${response.miniAppName}, access token installed. Reload this page`);

		return response;
	},
	target: updateLocalStorageFx,
});

sample({
	clock: getAccessTokenMiniAppFx.failData,
	fn: ({ event, status }) => {
		// FIXME: note pure fix
		toast.error(`Error status code: ${status}, event: ${event}`);

		return status;
	},
	target: $configMiniAppError,
});
