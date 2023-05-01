import { FunctionComponent, useEffect, useState } from 'react';
import { ReactComponent as AtSVG } from '../../../assets/svgs/icons/at.svg';
import { ReactComponent as CoinsSVG } from '../../../assets/svgs/icons/coins-fill.svg';
import { ReactComponent as FirstAidSVG } from '../../../assets/svgs/icons/first-aid-fill.svg';
import { ReactComponent as MapPinSVG } from '../../../assets/svgs/icons/map-pin-fill.svg';
import { ReactComponent as PhoneSVG } from '../../../assets/svgs/icons/phone.svg';
import { ReactComponent as EmptyStarSVG } from '../../../assets/svgs/icons/star-empty.svg';
import { ReactComponent as FillStarSVG } from '../../../assets/svgs/icons/star-fill.svg';
import { ReactComponent as HalfStarSVG } from '../../../assets/svgs/icons/star-half.svg';
import useAuthToken from '../../../hooks/auth-token';
import IDoctor from '../../../interfaces/doctor';
import currencyFormat from '../../../utilities/currency-format';
import Button from '../../button/button';
import Modal from '../../modal/modal';
import './doctor-card.css';

interface IProps {
	data: IDoctor;
}

function DoctorCard({ data }: IProps) {
	const authToken = useAuthToken();
	const [reserving, setReserving] = useState<boolean>(false);

	useEffect(() => {
		if (reserving) document.documentElement.style.overflow = "hidden";
		return () => document.documentElement.removeAttribute('style');
	}, [reserving]);

	return (
		<div className='doctor-card'>
			<div className="image">
				<img src={`${import.meta.env.VITE_API_URL}/uploads/${data.image}`} alt={data.name} loading='lazy' />
			</div>
			<div className="details">
				<div id='name-rating'>
					<p>Dr. {data.name}</p>
					<Rating rate={data.rating} />
				</div>
				<div id="information">
					<small><FirstAidSVG /> {data.specializations.join(" + ")}</small>
					<small><MapPinSVG /> {data.address}</small>
					<small><CoinsSVG /> {currencyFormat(data.priceRange.from)} ~ {currencyFormat(data.priceRange.to)}</small>
				</div>
			</div>
			{authToken && authToken.type === "Patient" && <div className="contact">
				<Button condition='primary' action={() => setReserving(true)} label="Reserve now" />
				<a href={`tel:+2${data.phone}`} target='_blank' rel="noreferrer"><Button condition='primary' icon={<PhoneSVG />} /></a>
				<a href={`mailto:${data.email}`} target='_blank' rel="noreferrer"><Button condition='primary' icon={<AtSVG />} /></a>
			</div>}
			{reserving && <Modal setVisibility={setReserving} doctor={data} />}
		</div>
	);
}

function Rating({ rate }: { rate: number; }) {
	const stars: FunctionComponent[] = Array(5);
	stars.fill(EmptyStarSVG);
	stars.fill(FillStarSVG, 0, Math.floor(rate));
	if (rate % 1 !== 0) stars[Math.floor(rate)] = HalfStarSVG;
	return <span>{stars.map((Star, index) => <Star key={index} />)}</span>;
}

export default DoctorCard;