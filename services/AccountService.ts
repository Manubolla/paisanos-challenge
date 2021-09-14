import { QuoteResponse } from '../types/DTOs/QuoteServiceDTO';
const FAVORITEQUOTES = 'FAVORITEQUOTES';
export default class AccountService {
	//Get user favorite quotes
	static getFavorites = async (): Promise<QuoteResponse[] | '' | undefined> => {
		try {
			const favQuotes = localStorage.getItem(FAVORITEQUOTES);

			if (!favQuotes) return '';
			const response: QuoteResponse[] = JSON.parse(favQuotes);

			return response;
		} catch (error) {
			if (error instanceof Error) {
				//Should use sentry or some package to handle errors correctly.
				console.log(error.message);
			}
		}
	};
	//Save user favorite quote
	static saveFavorite = async (favQuote: QuoteResponse) => {
		try {
			const storageQuotes = localStorage.getItem(FAVORITEQUOTES);
			const currentfavorites = storageQuotes ? JSON.parse(storageQuotes) : null;

			if (!currentfavorites) {
				localStorage.setItem(FAVORITEQUOTES, JSON.stringify([favQuote]));
			} else {
				currentfavorites.push(favQuote);
				localStorage.setItem(FAVORITEQUOTES, JSON.stringify(currentfavorites));
			}
		} catch (error) {
			if (error instanceof Error) {
				//Should use sentry or some package to handle errors correctly.
				console.log(error.message);
			}
		}
	};
	//Remove quote from favorites quotes
	static removeFavorite = async (favQuote: QuoteResponse) => {
		try {
			const storageQuotes = localStorage.getItem(FAVORITEQUOTES);
			const currentfavorites = storageQuotes ? JSON.parse(storageQuotes) : null;

			if (!currentfavorites) return;

			const filteredFavs: QuoteResponse[] = currentfavorites.filter(
				(item: QuoteResponse) => item.quote != favQuote.quote
			);
			localStorage.setItem(FAVORITEQUOTES, JSON.stringify(filteredFavs));
		} catch (error) {
			if (error instanceof Error) {
				//Should use sentry or some package to handle errors correctly.
				console.log(error.message);
			}
		}
	};
}
