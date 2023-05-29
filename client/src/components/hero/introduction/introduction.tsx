import { useNavigate } from 'react-router-dom';
import Button from '../../button/button';
import './introduction.css';

function IntroductionHero() {
	const navigate = useNavigate();

	return (
		<section className='introduction-hero'>
			<article>
				<div className="headings">
					<h1>Revitalize your health with Heal.</h1>
					<h4>Find the doctor you are looking for</h4>
				</div>
				<p>Heal allows patients to search for and explore doctors based on their specialty, location, availability, and reviews. Patients can then reserve an appointment with their chosen doctor at a convenient time and date. The app provides a user-friendly interface that simplifies the process of finding and booking a doctor's appointment.</p>
				<Button condition='primary' action={() => navigate('/doctors')} label='Explore doctors' />
			</article>
		</section>
	);
}

export default IntroductionHero;