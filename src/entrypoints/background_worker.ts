import { CHROME_RUNTIME_EVENT } from '../shared/const';
import { type WorkerMessages } from '../shared/types';
import { getAccessToken } from '../shared/utils/getAccessToken';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	const tabId = sender.tab?.id;

	if (!tabId) return;

	if (message === CHROME_RUNTIME_EVENT.miniAppAccessToken) {
		void getAccessToken({ url: sender.url, sendResponse });

		// For work sendResponse with async
		return true;
	}

	if (message === CHROME_RUNTIME_EVENT.xDebugSession) {
		chrome.cookies.onChanged.addListener((changeInfo) => {
			if (changeInfo.cookie.name !== CHROME_RUNTIME_EVENT.xDebugSession) return;

			chrome.tabs.sendMessage<WorkerMessages>(tabId, {
				event: CHROME_RUNTIME_EVENT.xDebugSession,
				removed: changeInfo.removed,
			});
		});

		chrome.cookies.get({ name: message as string, url: sender.url as string }, (cookie) => {
			chrome.tabs.sendMessage<WorkerMessages>(tabId, {
				event: CHROME_RUNTIME_EVENT.xDebugSession,
				removed: !cookie,
			});
		});
	}
});
