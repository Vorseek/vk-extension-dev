import { createEvent, createStore } from 'effector';
import { type AlertColor } from '@mui/material/Alert/Alert';

export const openSnackbar = createEvent<{ severity: AlertColor; text: string }>();
export const closeSnackbar = createEvent();

export const $isOpen = createStore(false)
	.on(openSnackbar, () => true)
	.on(closeSnackbar, () => false);

export const $severity = createStore<AlertColor>('info').on(
	openSnackbar,
	(_, nextState) => nextState.severity,
);

export const $text = createStore<string>('').on(openSnackbar, (_, nextState) => nextState.text);
