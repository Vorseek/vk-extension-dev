import { type ChangeEvent } from 'react';
import { useStore } from 'effector-react';
import { Modal, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';

import {
	$accessModalIsOpen,
	$currentMiniAppName,
	closeAccessModal,
	setMiniAppName,
} from '../../model/store';
import { $isAccessTokenLoading, configureMiniApp } from '../../../ConfigureMiniApp';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	maxWidth: '100%',
} as const;

export const AccessMiniAppNameModal = () => {
	const accessModalIsOpen = useStore($accessModalIsOpen);
	const isAccessTokenLoading = useStore($isAccessTokenLoading);
	const currentMiniAppName = useStore($currentMiniAppName);

	const handleClose = () => {
		closeAccessModal();
	};

	const handleConfigureMiniAppHandler = () => {
		configureMiniApp();
	};

	const handleInputMiniAppNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		setMiniAppName(event.target.value);
	};

	return (
		<Modal open={accessModalIsOpen} onClose={handleClose} closeAfterTransition>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				flexDirection="column"
				gap={1}
				sx={style}>
				<TextField
					size="small"
					label="MiniApp Name"
					variant="outlined"
					value={currentMiniAppName}
					onChange={handleInputMiniAppNameChange}
				/>

				<LoadingButton
					onClick={handleConfigureMiniAppHandler}
					loading={isAccessTokenLoading}
					size="small"
					variant="outlined">
					Подтвердить
				</LoadingButton>
			</Box>
		</Modal>
	);
};
