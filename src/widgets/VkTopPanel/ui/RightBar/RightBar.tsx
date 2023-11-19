import { ConfigureMiniApp } from '../../../../features/ConfigureMiniApp';
import { DebugMode } from '../../../../features/DebugMode';
import styles from '../VkTopPanel.module.css';

export const RightBar = () => {
	return (
		<div className={styles.rightBar}>
			<ConfigureMiniApp />

			<DebugMode />
		</div>
	);
};
