import { createRoot } from 'react-dom/client';

import { Popup, setCurrentTab, setTabUrl } from '../widgets/Popup';
import { isNumber } from '../shared/typeguards';
import { getRequestUrl } from '../features/VkDevClient/model/utils/getRequestUrl';
import { setRequestUrl } from '../features/VkDevClient/model/store';

try {
	const root = createRoot(document.querySelector('#root')!);

	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const [tab] = tabs;
		const tabId = tab.id;

		if (!isNumber(tabId)) return;

		setCurrentTab(tabId);

		if (!tab.url) return;

		const url = getRequestUrl(tab.url);

		setRequestUrl(url);
		setTabUrl(tab.url);
	});

	root.render(<Popup />);
} catch (error) {
	console.error(error);
}
