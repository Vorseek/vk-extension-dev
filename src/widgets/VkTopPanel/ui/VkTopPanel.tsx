import { DebugMode } from '../../../features/DebugMode';

import styles from './VkTopPanel.module.css';

import './main.css';

export const VkTopPanel = () => {
	return (
		<div className={styles.root}>
			<div className={styles.layout}>
				<div />
				<div>
					<DebugMode />
				</div>
			</div>
		</div>
	);
};
