import { useNavigate } from 'react-router-dom';
import Button from '../../button/button';
import { ReactComponent as NotFoundSVG } from './../../../assets/svgs/illustrations/not-found.svg';
import './not-found.css';

function NotFound() {
	const navigate = useNavigate();

	return (
		<section className='not-found-hero'>
			<article>
				<h1>Error 404</h1>
				<p>The page you trying to access is not found.<br />Please double check the page URL or return back to the home page</p>
				<Button condition='primary' action={() => navigate('/')} label='Go back' />
			</article>
			<NotFoundSVG />
		</section>
	);
}

export default NotFound;