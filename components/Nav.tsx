import styles from '../styles/Nav.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Nav = () => {
	const router = useRouter();
	return (
		<nav className={styles.nav}>
			<ul>
				<li className={`${router.pathname == '/' && styles.selected}`}>
					<Link href='/'>Home</Link>
				</li>
				<li className={`${router.pathname == '/singlequote' && styles.selected}`}>
					<Link href='/singlequote'>Random Quote</Link>
				</li>
				<li className={`${router.pathname == '/randomquotes' && styles.selected}`}>
					<Link href='/randomquotes'>15 random quotes</Link>
				</li>
				<li className={`${router.pathname == '/favorites' && styles.selected}`}>
					<Link href='/favorites'>Favorites</Link>
				</li>
			</ul>
		</nav>
	);
};
export default Nav;
