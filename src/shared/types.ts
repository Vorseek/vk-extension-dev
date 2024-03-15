import { type CHROME_RUNTIME_EVENT } from './const';

export type RuntimeEvents<T = unknown> = {
	event: ValueOf<typeof CHROME_RUNTIME_EVENT>;
	payload?: T;
};

export type XDebugMessage = { event: typeof CHROME_RUNTIME_EVENT.xDebugSession; removed: boolean };

export type WorkerMessages = XDebugMessage;
