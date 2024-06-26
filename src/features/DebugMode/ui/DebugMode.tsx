import classNames from 'classnames';
import { useStore } from 'effector-react';

import { $stormDebugCookie, toggleStormDebugCookie } from '../';
import { BugIcon } from '../../../shared/components/icon/BugIcon';

import styles from './DebugMode.module.css';

export const DebugMode = () => {
	const stormDebugCookie = useStore($stormDebugCookie);

	const handleDebugClick = () => {
		toggleStormDebugCookie();
	};

	const status = stormDebugCookie ? 'Enabled' : 'Disabled';

	const title = `XDebug: ${status}`;

	return (
		<button onClick={handleDebugClick} title={title}>
			<BugIcon
				className={classNames(styles.debugIcon, {
					[styles.enabledDebug]: stormDebugCookie,
					[styles.disabledDebug]: !stormDebugCookie,
				})}
			/>
		</button>
	);
};
