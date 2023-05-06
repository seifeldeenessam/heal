import { At, Coins, FirstAid, MapPin, Phone } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
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
				<p>Dr. {data.name}</p>
				<div id="information">
					<small><FirstAid /> {data.specializations.join(" + ")}</small>
					<small><MapPin /> {Object.values(data.address).reverse().join(", ")}</small>
					<small><Coins /> {currencyFormat(data.priceRange.from)} ~ {currencyFormat(data.priceRange.to)}</small>
				</div>
			</div>
			{authToken && authToken.type === "PATIENT" && <div className="contact">
				<Button condition='primary' action={() => setReserving(true)} label="Reserve now" />
				<a href={`tel:+2${data.phone}`} target='_blank' rel="noreferrer"><Button condition='primary' icon={<Phone />} /></a>
				<a href={`mailto:${data.email}`} target='_blank' rel="noreferrer"><Button condition='primary' icon={<At />} /></a>
			</div>}
			{reserving && <Modal setVisibility={setReserving} doctor={data} />}
		</div>
	);
}

export default DoctorCard;