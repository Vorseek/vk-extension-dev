import { type MiniAppAccessTokenSuccess } from '../../features/ConfigureMiniApp';

export const setMiniAppAccessToken = ({ miniAppName, accessToken }: MiniAppAccessTokenSuccess) => {
	const apiHostKey = `${miniAppName}:api_host`;
	const accessTokenKey = `${miniAppName}:access_token`;

	localStorage.setItem(apiHostKey, process.env.DEFAULT_API_URL as string);
	localStorage.setItem(accessTokenKey, accessToken);
};
