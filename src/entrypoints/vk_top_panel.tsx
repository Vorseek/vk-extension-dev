import { createRoot } from 'react-dom/client';

import { CHROME_RUNTIME_EVENT, TOP_PANEL_ID } from '../shared/const';
import { VkTopPanel } from '../widgets/VkTopPanel';
import { setStormDebugCookie } from '../features/DebugMode';

try {
	const element = document.createElement('div');
	element.setAttribute('id', TOP_PANEL_ID);

	document.body.prepend(element);

	const root = createRoot(element);

	root.render(<VkTopPanel />);

	chrome.runtime.onMessage.addListener(
		(message: Pick<chrome.cookies.CookieChangeInfo, 'removed'>) => {
			setStormDebugCookie(!message.removed);
		},
	);

	chrome.runtime.sendMessage(CHROME_RUNTIME_EVENT.xDebugSession);
} catch (error) {
	console.log(error);
}
