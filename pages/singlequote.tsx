import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import QuoteCard from '../components/QuoteCard';
import QuoteService from '../services/QuoteService';
import { QuoteResponse } from '../types/DTOs/QuoteServiceDTO';
import styles from '../styles/Quotes.module.css';
import Loader from '../components/Loader';

const SingleQuote: NextPage = () => {
	const [quotes, setQuotes] = useState<QuoteResponse[] | undefined>();
	const fetchData = async () => {
		const result = await QuoteService.getSingleRandomQuote();
		if (result) setQuotes(result);
		return result;
	};
	useEffect(() => {
		fetchData();
	}, []);

	//Spinner loading
	if (!quotes) return <Loader />;

	return (
		<div className={styles.container}>
			<button style={{ position: 'absolute', top: 0 }} onClick={fetchData}>
				GET RANDOM QUOTE
			</button>
			{quotes && quotes.map((item) => <QuoteCard data={item} key={Math.random()} />)}
		</div>
	);
};

export default SingleQuote;
