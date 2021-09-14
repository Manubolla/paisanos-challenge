import Image from 'next/image';
import Loading from '../public/monkey-loading.gif';

const Loader = () => {
	return (
		<div className='containerLoading'>
			<Image
				className='loading'
				alt='monkey loading'
				src={Loading}
				width={150}
				height={150}
				layout='fixed'
			/>
		</div>
	);
};
export default Loader;
