import { type CHROME_RUNTIME_EVENT } from './const';

export type RuntimeEvents = ValueOf<typeof CHROME_RUNTIME_EVENT>;

export type XDebugMessage = { event: typeof CHROME_RUNTIME_EVENT.xDebugSession; removed: boolean };

export type WorkerMessages = XDebugMessage;
