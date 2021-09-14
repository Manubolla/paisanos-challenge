import React, { useState } from 'react';
import { QuoteResponse } from '../types/DTOs/QuoteServiceDTO';
import Image from 'next/image';
import styles from '../styles/QuoteCard.module.css';
import AccountService from '../services/AccountService';
import approval from '../public/krusty-approval.png';
import heartOn from '../public/icons/heart-full.png';
import heartOff from '../public/icons/heart-outline.png';

interface Props {
	data: QuoteResponse;
	isFavorite?: boolean;
	setData?: React.Dispatch<React.SetStateAction<any>>;
}

const QuoteCard = (props: Props): JSX.Element => {
	const { data, isFavorite = false, setData } = props;

	const [favorite, setFavorite] = useState(isFavorite);

	const saveFavorite = async () => {
		try {
			await AccountService.saveFavorite(data);
			if (setData) {
				setData((favs: QuoteResponse[]) => [...favs, data]);
			}
			setFavorite(true);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	};
	const removeFav = async () => {
		try {
			await AccountService.removeFavorite(data);
			if (setData) {
				setData((favs: QuoteResponse[]) => {
					const filteredFavs: QuoteResponse[] = favs.filter(
						(item: QuoteResponse) => item.quote != data.quote
					);
					return filteredFavs;
				});
			}
			setFavorite(false);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	};
	return (
		<div className={styles.cardContainer}>
			<div className={styles.cardHeader}>
				<h3 className={`${styles.cardTitle} ${isFavorite ? styles.cardTitleFavorite : ''}`}>
					{data.character}
				</h3>
				<Image
					className={styles.leftPhoto}
					src={data.image}
					alt={`${data.character} Image`}
					width={75}
					height={75}
					objectFit='contain'
					layout='intrinsic'
				/>
				{isFavorite && (
					<div className={styles.approval}>
						<Image
							alt={`${data.character} Approval`}
							src={approval}
							width={100}
							height={100}
							quality={100}
							objectFit='contain'
							layout='intrinsic'
						/>
					</div>
				)}
			</div>
			<div className={styles.bodyContainer}>
				<p className={` ${styles.bubble} `}>{`"${data.quote}"`}</p>
				<div className={styles.favoriteContainer}>
					{favorite ? (
						<Image
							className={styles.heartOn}
							alt={`${data.character} Favorite`}
							src={heartOn}
							width={30}
							height={30}
							objectFit='contain'
							layout='fixed'
							onClick={removeFav}
						/>
					) : (
						<Image
							alt={`${data.character} Favorite`}
							src={heartOff}
							width={30}
							height={30}
							objectFit='contain'
							layout='fixed'
							onClick={saveFavorite}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default QuoteCard;
