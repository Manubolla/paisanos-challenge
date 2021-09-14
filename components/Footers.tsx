import styles from '../styles/Nav.module.css';
import Link from 'next/link';

const Footer = () => {
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<Link href='/'>Home</Link>
				</li>

				<li>
					<Link href='/favorites'>Favorites</Link>
				</li>
			</ul>
		</nav>
	);
};
export default Footer;
