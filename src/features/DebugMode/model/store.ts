import { createEffect, createEvent, createStore, sample } from 'effector';

import { deleteCookie, setCookie } from '../../../shared/cookie';
import { CHROME_RUNTIME_EVENT } from '../../../shared/const';

export const setStormDebugCookie = createEvent<boolean>();
export const toggleStormDebugCookie = createEvent();

export const $stormDebugCookie = createStore(false).on(setStormDebugCookie, (_, value) => value);

const enableStormDebugFx = createEffect(() => {
	setCookie(CHROME_RUNTIME_EVENT.xDebugSession, 'XDEBUG_ECLIPSE');
});

const disableStormDebugFx = createEffect(() => {
	deleteCookie(CHROME_RUNTIME_EVENT.xDebugSession);
});

sample({
	clock: toggleStormDebugCookie,
	source: $stormDebugCookie,
	filter: (stormDebugCookie) => !stormDebugCookie,
	target: enableStormDebugFx,
});

sample({
	clock: toggleStormDebugCookie,
	source: $stormDebugCookie,
	filter: (stormDebugCookie) => stormDebugCookie,
	target: disableStormDebugFx,
});
