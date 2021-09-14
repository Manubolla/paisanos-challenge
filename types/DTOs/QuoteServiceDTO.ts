export type QuoteResponse = {
	quote: string;
	character: string;
	image: string | StaticImageData;
	characterDirection: 'Left' | 'Right';
};
