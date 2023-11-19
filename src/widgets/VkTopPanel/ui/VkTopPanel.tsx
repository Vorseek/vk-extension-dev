import { ToastContainer } from 'react-toastify';

import { DebugMode } from '../../../features/DebugMode';
import { ConfigureMiniApp } from '../../../features/ConfigureMiniApp/ui/ConfigureMiniApp';

import styles from './VkTopPanel.module.css';

import './main.css';
import 'react-toastify/dist/ReactToastify.css';

export const VkTopPanel = () => {
	return (
		<>
			<div className={styles.root}>
				<div className={styles.layout}>
					<div />
					<div className={styles.rightBar}>
						<ConfigureMiniApp />

						<DebugMode />
					</div>
				</div>
			</div>

			<ToastContainer />
		</>
	);
};
