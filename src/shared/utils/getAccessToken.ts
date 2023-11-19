import { RESPONSE_MINI_APP_ACCESS_TOKEN } from '../const';
import { type ResponseMiniAppAccessToken } from '../../features/ConfigureMiniApp/model/types';

type Params = {
	url?: string;
	sendResponse: (response: ResponseMiniAppAccessToken) => void;
};

const DEFAULT_MINI_APP = 'market_item_create';
const RESPONSE_URL = '';

const getMiniAppName = (url?: string) => {
	if (!url) return DEFAULT_MINI_APP;

	const { pathname } = new URL(url);

	const regex = /(\w+)/;

	const result = regex.exec(pathname);

	return result ? result[0] : DEFAULT_MINI_APP;
};

/*
 * For usage in worker
 * */
export const getAccessToken = async ({ url, sendResponse }: Params) => {
	const miniAppName = getMiniAppName(url);

	const response = await fetch(`${RESPONSE_URL}?act=vkui_access_token&name=${miniAppName}`);

	if (!response.ok) {
		sendResponse({
			event: RESPONSE_MINI_APP_ACCESS_TOKEN.miniAppAccessTokenError,
			status: response.status,
		});
	}

	const accessToken = await response.text();

	sendResponse({
		event: RESPONSE_MINI_APP_ACCESS_TOKEN.miniAppAccessToken,
		accessToken,
		miniAppName,
	});
};
