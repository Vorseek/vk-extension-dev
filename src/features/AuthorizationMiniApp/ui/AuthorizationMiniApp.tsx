import { useStore } from 'effector-react';
import { LoadingButton } from '@mui/lab';

import { $isAccessTokenLoading } from '../../ConfigureMiniApp';
import { openAccessModal } from '../model/store';

import { AccessMiniAppNameModal } from './AccessMiniAppNameModal/AccessMiniAppNameModal';

export const AuthorizationMiniApp = () => {
	const isAccessTokenLoading = useStore($isAccessTokenLoading);

	const handleConfigureMiniAppHandler = () => {
		openAccessModal();
	};

	return (
		<>
			<LoadingButton
				onClick={handleConfigureMiniAppHandler}
				loading={isAccessTokenLoading}
				size="small"
				variant="outlined">
				Авторизовать MiniApp
			</LoadingButton>

			<AccessMiniAppNameModal />
		</>
	);
};
