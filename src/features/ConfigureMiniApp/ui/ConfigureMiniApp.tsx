import { configureMiniApp } from '../model/store';

/*
 * @deprecated
 * @use AuthorizationMiniApp
 * */
export const ConfigureMiniApp = () => {
	const handleButtonClick = () => {
		configureMiniApp();
	};

	return (
		<button title="Get MiniApp access token" onClick={handleButtonClick}>
			MiniApp Auth
		</button>
	);
};
