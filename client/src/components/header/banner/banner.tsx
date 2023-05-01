import { useNavigate } from 'react-router-dom';
import Button from '../../button/button';
import { ReactComponent as MedicineSVG } from './../../../assets/svgs/illustrations/medicine.svg';
import './banner.css';

function Banner() {
	const navigate = useNavigate();

	return (
		<header>
			<article>
				<h1>Revitalize your health with Heal.</h1>
				<p>Heal allows patients to search for and explore doctors based on their specialty, location, availability, and reviews. Patients can then reserve an appointment with their chosen doctor at a convenient time and date. The app provides a user-friendly interface that simplifies the process of finding and booking a doctor's appointment.</p>
				<Button condition='primary' action={() => navigate('/doctors')} label='Explore doctors' />
			</article>
			<MedicineSVG />
		</header>
	);
}

export default Banner;