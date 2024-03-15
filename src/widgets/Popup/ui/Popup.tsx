import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Snackbar } from '../../../shared/components/Snackbar/ui/Snackbar';
import { VkDevClient } from '../../../features/VkDevClient/ui/VkDevClient';
import { AuthorizationMiniApp } from '../../../features/AuthorizationMiniApp/ui/AuthorizationMiniApp';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

export const Popup = () => {
	return (
		<ThemeProvider theme={darkTheme}>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				flexDirection="column"
				gap={1}>
				<Typography display="flex" justifyContent="center" mb={1} mt={1}>
					Vk Dev
				</Typography>

				<AuthorizationMiniApp />

				<VkDevClient />
			</Box>

			<CssBaseline />
			<Snackbar />
		</ThemeProvider>
	);
};
