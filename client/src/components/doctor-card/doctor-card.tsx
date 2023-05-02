import { At, Coins, FirstAid, MapPin, Phone, Star, StarFour, StarHalf } from '@phosphor-icons/react';
import { FunctionComponent, useEffect, useState } from 'react';
import useAuthToken from '../../hooks/auth-token';
import IDoctor from '../../interfaces/doctor';
import currencyFormat from '../../utilities/currency-format';
import Button from '../button/button';
import Modal from '../modal/modal';
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
					<small><FirstAid /> {data.specializations.join(" + ")}</small>
					<small><MapPin /> {data.address}</small>
					<small><Coins /> {currencyFormat(data.priceRange.from)} ~ {currencyFormat(data.priceRange.to)}</small>
				</div>
			</div>
			{authToken && authToken.type === "Patient" && <div className="contact">
				<Button condition='primary' action={() => setReserving(true)} label="Reserve now" />
				<a href={`tel:+2${data.phone}`} target='_blank' rel="noreferrer"><Button condition='primary' icon={<Phone />} /></a>
				<a href={`mailto:${data.email}`} target='_blank' rel="noreferrer"><Button condition='primary' icon={<At />} /></a>
			</div>}
			{reserving && <Modal setVisibility={setReserving} doctor={data} />}
		</div>
	);
}

function Rating({ rate }: { rate: number; }) {
	const stars: FunctionComponent[] = Array(5);
	stars.fill(Star);
	stars.fill(StarHalf, 0, Math.floor(rate));
	if (rate % 1 !== 0) stars[Math.floor(rate)] = Star;
	return <span>{stars.map((Star, index) => <Star key={index} />)}</span>;
}

export default DoctorCard;