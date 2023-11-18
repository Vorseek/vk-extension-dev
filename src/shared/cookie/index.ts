/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/restrict-plus-operands,guard-for-in */

// https://learn.javascript.ru/cookie

export const getCookie = (name: string) => {
	const matches = new RegExp(
		`(?:^|; )${name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1')}=([^;]*)`,
	).exec(document.cookie);

	return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name: string, value: string, options: any = {}) => {
	const today = new Date();
	const expires = new Date(today.setFullYear(today.getFullYear() + 1));

	options = {
		path: '/',
		expires,
		// При необходимости добавьте другие значения по умолчанию
		...options,
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

	for (const optionKey in options) {
		updatedCookie += '; ' + optionKey;
		const optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += '=' + optionValue;
		}
	}

	document.cookie = updatedCookie;
};

export const deleteCookie = (name: string) => {
	setCookie(name, '', {
		'max-age': -1,
	});
};
