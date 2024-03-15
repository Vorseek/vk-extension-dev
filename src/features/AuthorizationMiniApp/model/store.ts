import { createEvent, createStore, sample } from 'effector';

import { getMiniAppName } from '../../../shared/utils/getAccessToken';
import { $currentTabUrl } from '../../../widgets/Popup';

export const openAccessModal = createEvent();
export const closeAccessModal = createEvent();
export const setMiniAppName = createEvent<string | null>();

export const $accessModalIsOpen = createStore(false)
	.on(openAccessModal, () => true)
	.on(closeAccessModal, () => false);

export const $currentMiniAppName = createStore<string | null>('').on(
	setMiniAppName,
	(_, nextState) => nextState,
);

sample({
	clock: $currentTabUrl,
	fn: getMiniAppName,
	target: $currentMiniAppName,
});
