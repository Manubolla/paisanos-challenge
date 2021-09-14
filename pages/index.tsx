import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import heroMobile from '../public/hero-mobile.jpg';
import heroPhoto from '../public/hero.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
	const [size, setSize] = useState({ width: window.screen.width, height: window.screen.height });
	const [hero, setHero] = useState(heroPhoto);

	useEffect(() => {
		if (window.screen.width >= 450) {
			setHero(heroPhoto);
		} else {
			setHero(heroMobile);
		}

		const handleResize = () => {
			setSize({ width: window.innerWidth, height: window.innerHeight });

			if (window.innerWidth >= 450) setHero(heroPhoto);
			else setHero(heroMobile);
		};
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div className={styles.hero}>
			<Image alt='hero paisanos' src={hero} layout='fill' quality={100} />
			<div id='outer'>
				<Link href='/randomquotes' passHref>
					<div
						className={`${styles.button_slide} ${styles.slide_right} ${
							size.width >= 450 ? styles.searchButtonWeb : styles.searchButtonMobile
						}`}>
						Search quotes
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Home;
