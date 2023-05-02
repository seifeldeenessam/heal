import { User, At, Phone, Cake, Drop, Virus, FirstAid, MapPin, Coins, Star, GenderMale, GenderFemale } from '@phosphor-icons/react';
import IDoctor from '../../../interfaces/doctor';
import IPatient from '../../../interfaces/patient';
import IUser from '../../../interfaces/user';
import capitalizeText from '../../../utilities/capitalize-text';
import currencyFormat from '../../../utilities/currency-format';
import './account-details.css';

interface IProps {
	user: IUser & IDoctor & IPatient;
}

export default function AccountDetails({ user }: IProps) {
	return (
		<div className="account-details">
			<div className="image">
				<img src={`${import.meta.env.VITE_API_URL}/uploads/${user.image}`} alt={user.name} loading='lazy' />
			</div>
			<ul className="information">
				<li><span>Name</span><small><User />{user.name}</small></li>
				<li><span>Email</span><small><At />{user.email}</small></li>
				<li><span>Phone</span><small><Phone />{user.phone}</small></li>
				<li><span>Birthdate</span><small><Cake />{user.birthdate.toString().split("T")[0]}</small></li>
				{user.bloodType && <li><span>Blood type</span><small><Drop />{user.bloodType}</small></li>}
				{user.diseases && <li><span>Diseases</span><small><Virus />{user.diseases.join(", ")}</small></li>}
				{user.specializations && <li><span>Specializations</span><small><FirstAid />{user.specializations.join(" + ")}</small></li>}
				{user.address && <li><span>Address</span><small><MapPin />{user.address}</small></li>}
				{user.priceRange && <li><span>Pricing range</span><small><Coins />{currencyFormat(user.priceRange.from)} ~ {currencyFormat(user.priceRange.to)}</small></li>}
				{user.rating === undefined ? undefined : <li><span>Rating</span><small><Star />{user.rating}</small></li>}
				<li><span>Gender</span><small>{user.gender === "MALE" ? <GenderMale /> : <GenderFemale />}{capitalizeText(user.gender)}</small></li>
			</ul>
		</div>
	);
}

