import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import QuoteCard from '../components/QuoteCard';
import QuoteService from '../services/QuoteService';
import { QuoteResponse } from '../types/DTOs/QuoteServiceDTO';
import styles from '../styles/RandomQuotes.module.css';
import Loader from '../components/Loader';

const RandomQuotes: NextPage = () => {
	const [quotes, setQuotes] = useState<QuoteResponse[] | undefined>();
	const [data, setData] = useState<QuoteResponse[] | undefined>(quotes);
	const [notFound, setNotFound] = useState(false);

	const fetchData = async () => {
		const result = await QuoteService.getRandomQuotes();
		if (result) {
			setData(result);
			setQuotes(result);
		}
		return result;
	};
	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (data) {
			const filteredList = data.filter((item) => {
				return item.character.toLowerCase().includes(e.currentTarget.value.toLowerCase());
			});
			if (filteredList.length == 0) setNotFound(true);
			else setNotFound(false);

			setQuotes(filteredList);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	if (notFound)
		return (
			<div className={styles.containerLoading}>
				<input placeholder='filter by character' style={{ marginTop: '1em' }} onChange={onSearch} />

				<h1 style={{ marginTop: '1em' }}> No results...</h1>
			</div>
		);
	//Spinner loading
	if (!quotes) return <Loader />;

	return (
		<div className={styles.container}>
			<input
				placeholder='filter by character'
				style={{ position: 'absolute', top: 0 }}
				onChange={onSearch}
			/>
			{quotes && quotes.map((item) => <QuoteCard data={item} key={Math.random()} />)}
		</div>
	);
};

export default RandomQuotes;
