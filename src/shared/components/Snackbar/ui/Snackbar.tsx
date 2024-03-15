import Alert from '@mui/material/Alert';
import SnackbarMUI from '@mui/material/Snackbar';
import { useStore } from 'effector-react';

import { $isOpen, $severity, $text, closeSnackbar } from '../model/store';

export const Snackbar = () => {
	const isOpen = useStore($isOpen);
	const severity = useStore($severity);
	const text = useStore($text);

	const handleClose = () => {
		closeSnackbar();
	};

	return (
		<SnackbarMUI open={isOpen} autoHideDuration={3000} onClose={handleClose}>
			<Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
				{text}
			</Alert>
		</SnackbarMUI>
	);
};
