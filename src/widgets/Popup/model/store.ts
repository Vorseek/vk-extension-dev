import { createEvent, createStore } from 'effector';

export const setCurrentTab = createEvent<number>();
export const setTabUrl = createEvent<string | null>();

export const $currentTabId = createStore<number | null>(null).on(
	setCurrentTab,
	(_, nextState) => nextState,
);

export const $currentTabUrl = createStore<string | null>(null).on(
	setTabUrl,
	(_, nextState) => nextState,
);
