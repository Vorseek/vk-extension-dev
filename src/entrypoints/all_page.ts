import { RESPONSE_MINI_APP_ACCESS_TOKEN } from '../shared/const';
import { setMiniAppAccessToken } from '../shared/utils/setMiniAppAccessToken';
import { type ResponseMiniAppAccessToken } from '../features/ConfigureMiniApp';

try {
	chrome.runtime.onMessage.addListener((message: ResponseMiniAppAccessToken) => {
		if (message.event === RESPONSE_MINI_APP_ACCESS_TOKEN.miniAppAccessToken) {
			setMiniAppAccessToken(message);
		}
	});
} catch (error) {
	console.error(error);
}
