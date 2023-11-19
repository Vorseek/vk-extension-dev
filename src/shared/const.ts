export const TOP_PANEL_ID = '__top_panel_extension';

export const CHROME_RUNTIME_EVENT = {
	xDebugSession: 'XDEBUG_SESSION',
	miniAppAccessToken: 'MINI_APP_ACCESS_TOKEN',
} as const;

export const RESPONSE_MINI_APP_ACCESS_TOKEN = {
	miniAppAccessToken: 'miniAppAccessToken',
	miniAppAccessTokenError: 'miniAppAccessTokenError',
} as const;
