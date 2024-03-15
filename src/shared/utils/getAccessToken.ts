import { type ResponseMiniAppAccessToken } from '../../features/ConfigureMiniApp';
import { RESPONSE_MINI_APP_ACCESS_TOKEN } from '../const';

type Params = {
	url?: string;
	miniAppName?: string | null;
	sendResponse: (response: ResponseMiniAppAccessToken) => void;
};

const DEFAULT_MINI_APP = process.env.DEFAULT_MINI_APP as string;
const RESPONSE_URL = process.env.RESPONSE_URL_MINI_APP_AUTHORIZATION;
const ACCESS_TOKEN_ACT = process.env.ACCESS_TOKEN_ACT;

export const getMiniAppName = (url?: string | null) => {
	if (!url) return DEFAULT_MINI_APP;

	const { pathname } = new URL(url);

	const regex = /(\w+)/;

	const result = regex.exec(pathname);

	return result ? result[0] : DEFAULT_MINI_APP;
};

/*
 * For usage in worker
 * */
export const getAccessToken = async ({ url, sendResponse, miniAppName }: Params) => {
	const name = miniAppName ? miniAppName : getMiniAppName(url);

	const response = await fetch(`${RESPONSE_URL}?act=${ACCESS_TOKEN_ACT}&name=${name}`);

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
		miniAppName: name,
	});
};
