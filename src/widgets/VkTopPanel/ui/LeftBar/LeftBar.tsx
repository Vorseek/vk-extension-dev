import { GitLabIcon } from '../../../../shared/ui/icon/GitLabIcon';
import { JiraIcon } from '../../../../shared/ui/icon/JiraIcon';

import styles from './LeftBar.module.css';

const LINKS = [
	{
		icon: <GitLabIcon />,
		href: '',
	},
	{
		icon: <JiraIcon />,
		href: '',
	},
];

export const LeftBar = () => {
	return (
		<div className={styles.root}>
			{LINKS.map(({ href, icon }) => (
				<a className={styles.link} key={href} href={href} target="_blank" rel="noreferrer">
					{icon}
				</a>
			))}
		</div>
	);
};
