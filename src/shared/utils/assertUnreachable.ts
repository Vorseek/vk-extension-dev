export const assertUnreachable = (value: never): never => {
	throw new Error('Didnt expect to get here');
};
