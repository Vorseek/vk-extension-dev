import { CHROME_RUNTIME_EVENT } from '../shared/const';

chrome.runtime.onMessage.addListener((message, sender) => {
	const tabId = sender.tab?.id;

	if (!tabId) return;
	if (message !== CHROME_RUNTIME_EVENT.xDebugSession) return;

	chrome.cookies.onChanged.addListener((changeInfo) => {
		if (changeInfo.cookie.name !== CHROME_RUNTIME_EVENT.xDebugSession) return;

		chrome.tabs.sendMessage(tabId, { removed: changeInfo.removed });
	});

	chrome.cookies.get({ name: message as string, url: sender.url as string }, (cookie) => {
		chrome.tabs.sendMessage(tabId, { removed: !cookie });
	});
});
