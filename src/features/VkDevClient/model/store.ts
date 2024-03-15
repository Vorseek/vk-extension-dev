import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

type GateProps = { url: string | null };

export const VkDevClientGate = createGate<GateProps>();

export const setRequestUrl = createEvent<string>();
export const savePresetDevClient = createEvent<GateProps>();
export const clearPresetDevClient = createEvent<GateProps>();

const sendPingDevClientFx = createEffect(async ({ url }: GateProps) => {
	const response = await fetch(`${url}/ping`);

	return response.json();
});

export const $isVisibleDevClient = createStore(false);
export const $requestUrl = createStore<string | null>(null).on(
	setRequestUrl,
	(_, nextState) => nextState,
);

sample({
	clock: VkDevClientGate.open,
	filter: ({ url }) => Boolean(url?.includes(process.env.ADM_DOMAIN as string)),
	target: sendPingDevClientFx,
});

sample({
	clock: sendPingDevClientFx.done,
	fn: () => true,
	target: $isVisibleDevClient,
});

// Save preset

export const savePresetDevClientFx = createEffect(async ({ url }: GateProps) => {
	const response = await fetch(`${url}/save-preset`);

	return response.json();
});

sample({
	clock: savePresetDevClient,
	target: savePresetDevClientFx,
});

export const $savePresetLoading = savePresetDevClientFx.pending;

// Clear preset

export const clearPresetDevClientFx = createEffect(async ({ url }: GateProps) => {
	const response = await fetch(`${url}/clear-preset`);

	return response.json();
});

sample({
	clock: clearPresetDevClient,
	target: clearPresetDevClientFx,
});

export const $clearPresetLoading = clearPresetDevClientFx.pending;
