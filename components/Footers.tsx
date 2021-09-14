import styles from '../styles/Footer.module.css';

const Footer = () => {
	return (
		<nav className={styles.footer}>
			<ul>
				<li>Paisanos challenge</li>
				<li> {`© 2021 Manuel Bolla Agrelo - All rights reserved.`}</li>
			</ul>
		</nav>
	);
};
export default Footer;
