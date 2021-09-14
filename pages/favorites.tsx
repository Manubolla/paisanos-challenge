import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import QuoteCard from '../components/QuoteCard';
import AccountService from '../services/AccountService';
import { QuoteResponse } from '../types/DTOs/QuoteServiceDTO';
import styles from '../styles/Favorites.module.css';
import Loader from '../components/Loader';

const Favorites: NextPage = () => {
	const [favorites, setFavorites] = useState<QuoteResponse[] | undefined>();

	const fetchFavorites = async () => {
		const favs = await AccountService.getFavorites();

		if (!favs) return;
		setFavorites(favs);
	};
	useEffect(() => {
		fetchFavorites();
	}, []);

	if (!favorites) return <Loader />;

	return (
		<div className={styles.container}>
			{favorites &&
				favorites.map((item) => {
					return (
						<QuoteCard data={item} key={Math.random()} isFavorite={true} setData={setFavorites} />
					);
				})}
		</div>
	);
};

export default Favorites;
