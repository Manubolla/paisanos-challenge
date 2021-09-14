import axios, { AxiosResponse } from 'axios';
import { QuoteResponse } from '../types/DTOs/QuoteServiceDTO';

export default class QuoteService {
	//Get single random quote
	static getSingleRandomQuote = async () => {
		try {
			const result: AxiosResponse<QuoteResponse[]> = await axios.get(
				`${process.env.NEXT_PUBLIC_DB_URL}/quotes`
			);
			if (!result.data || result.data.length === 0) throw new Error('No quotes found');
			return result.data;
		} catch (error) {
			if (error instanceof Error) {
				//Should use sentry or some package to handle errors correctly.
				console.log(error.message);
			}
		}
	};

	//Get random quotes, 15 by default.
	static getRandomQuotes = async (quantity: number | undefined = 15) => {
		try {
			const result: AxiosResponse<QuoteResponse[]> = await axios.get(
				`${process.env.NEXT_PUBLIC_DB_URL}/quotes?count=${quantity}`
			);
			if (!result.data || result.data.length === 0) throw new Error('No quotes found');
			return result.data;
		} catch (error) {
			if (error instanceof Error) {
				//Should use sentry or some package to handle errors correctly.
				console.log(error.message);
			}
		}
	};
}
