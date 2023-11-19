import { ToastContainer } from 'react-toastify';

import { RightBar } from './RightBar/RightBar';
import { LeftBar } from './LeftBar/LeftBar';
import styles from './VkTopPanel.module.css';
import 'react-toastify/dist/ReactToastify.css';
import './main.css';

export const VkTopPanel = () => {
	return (
		<>
			<div className={styles.root}>
				<div className={styles.layout}>
					<LeftBar />

					<RightBar />
				</div>
			</div>

			<ToastContainer />
		</>
	);
};
