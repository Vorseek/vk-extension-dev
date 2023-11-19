import { createRoot } from 'react-dom/client';

import { CHROME_RUNTIME_EVENT, TOP_PANEL_ID } from '../shared/const';
import { VkTopPanel } from '../widgets/VkTopPanel';
import { setStormDebugCookie } from '../features/DebugMode';
import { assertUnreachable } from '../shared/utils/assertUnreachable';
import { type RuntimeEvents, type WorkerMessages } from '../shared/types';

try {
	const element = document.createElement('div');
	element.setAttribute('id', TOP_PANEL_ID);

	document.body.prepend(element);

	const root = createRoot(element);

	root.render(<VkTopPanel />);

	chrome.runtime.onMessage.addListener((message: WorkerMessages) => {
		switch (message.event) {
			case CHROME_RUNTIME_EVENT.xDebugSession: {
				setStormDebugCookie(!message.removed);

				break;
			}

			default: {
				// FIXME: remove after add case
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				assertUnreachable(message);
			}
		}
	});

	chrome.runtime.sendMessage<RuntimeEvents>(CHROME_RUNTIME_EVENT.xDebugSession);
} catch (error) {
	console.log(error);
}
