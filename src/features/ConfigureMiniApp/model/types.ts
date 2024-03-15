import { type RESPONSE_MINI_APP_ACCESS_TOKEN } from '../../../shared/const';

export type MiniAppAccessTokenSuccess = {
	event: typeof RESPONSE_MINI_APP_ACCESS_TOKEN.miniAppAccessToken;
	accessToken: string;
	miniAppName: string;
};
export type MiniAppAccessTokenError = {
	event: typeof RESPONSE_MINI_APP_ACCESS_TOKEN.miniAppAccessTokenError;
	status: number;
};

export type ResponseMiniAppAccessToken = MiniAppAccessTokenSuccess | MiniAppAccessTokenError;

export type GetAccessTokenParams = { miniAppName: string | null };
