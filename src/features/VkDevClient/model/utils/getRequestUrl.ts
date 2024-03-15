export const getRequestUrl = (url: string) => {
	const { hostname, protocol } = new URL(url);

	return `${protocol}//w-${hostname}`;
};
