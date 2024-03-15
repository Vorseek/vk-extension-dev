import { useGate, useStore } from 'effector-react';
import { LoadingButton } from '@mui/lab';

import {
	$clearPresetLoading,
	$isVisibleDevClient,
	$requestUrl,
	$savePresetLoading,
	clearPresetDevClient,
	savePresetDevClient,
	VkDevClientGate,
} from '../model/store';

export const VkDevClient = () => {
	const url = useStore($requestUrl);
	const savePresetLoading = useStore($savePresetLoading);
	const isVisibleDevClient = useStore($isVisibleDevClient);
	const clearPresetLoading = useStore($clearPresetLoading);

	useGate(VkDevClientGate, { url });

	if (!isVisibleDevClient) {
		return null;
	}

	const handleSavePresetClick = () => {
		savePresetDevClient({ url });
	};

	const handleClearPresetClick = () => {
		clearPresetDevClient({ url });
	};

	return (
		<>
			<LoadingButton
				onClick={handleSavePresetClick}
				loading={savePresetLoading}
				size="small"
				variant="outlined">
				Save preset
			</LoadingButton>

			<LoadingButton
				onClick={handleClearPresetClick}
				loading={clearPresetLoading}
				size="small"
				variant="outlined">
				Clear preset
			</LoadingButton>
		</>
	);
};
