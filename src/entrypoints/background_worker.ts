import { type RuntimeEvents } from '../shared/types';
import type { GetAccessTokenParams } from '../features/ConfigureMiniApp';
import { getAccessToken } from '../shared/utils/getAccessToken';

chrome.runtime.onMessage.addListener(
	(message: RuntimeEvents<GetAccessTokenParams>, sender, sendResponse) => {
		if (message) {
			void getAccessToken({
				url: sender.url,
				sendResponse,
				miniAppName: message.payload?.miniAppName,
			});
		}

		return true;
	},
);
