import IDoctor from '../../../interfaces/doctor';
import IPatient from '../../../interfaces/patient';
import IUser from '../../../interfaces/user';
import capitalizeText from '../../../utilities/capitalize-text';
import currencyFormat from '../../../utilities/currency-format';
import { ReactComponent as AtSVG } from './../../../assets/svgs/icons/at.svg';
import { ReactComponent as CakeSVG } from './../../../assets/svgs/icons/cake.svg';
import { ReactComponent as CoinsSVG } from './../../../assets/svgs/icons/coins.svg';
import { ReactComponent as DropSVG } from './../../../assets/svgs/icons/drop.svg';
import { ReactComponent as FirstAidSVG } from './../../../assets/svgs/icons/first-aid.svg';
import { ReactComponent as FemaleSVG } from './../../../assets/svgs/icons/gender-female.svg';
import { ReactComponent as MaleSVG } from './../../../assets/svgs/icons/gender-male.svg';
import { ReactComponent as MapPinSVG } from './../../../assets/svgs/icons/map-pin.svg';
import { ReactComponent as PhoneSVG } from './../../../assets/svgs/icons/phone.svg';
import { ReactComponent as StarSVG } from './../../../assets/svgs/icons/star-empty.svg';
import { ReactComponent as UserSVG } from './../../../assets/svgs/icons/user.svg';
import { ReactComponent as VirusSVG } from './../../../assets/svgs/icons/virus.svg';
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
				<li><span>Name</span><small><UserSVG />{user.name}</small></li>
				<li><span>Email</span><small><AtSVG />{user.email}</small></li>
				<li><span>Phone</span><small><PhoneSVG />{user.phone}</small></li>
				<li><span>Birthdate</span><small><CakeSVG />{user.birthdate.toString().split("T")[0]}</small></li>
				{user.bloodType && <li><span>Blood type</span><small><DropSVG />{user.bloodType}</small></li>}
				{user.diseases && <li><span>Diseases</span><small><VirusSVG />{user.diseases.join(", ")}</small></li>}
				{user.specializations && <li><span>Specializations</span><small><FirstAidSVG />{user.specializations.join(" + ")}</small></li>}
				{user.address && <li><span>Address</span><small><MapPinSVG />{user.address}</small></li>}
				{user.priceRange && <li><span>Pricing range</span><small><CoinsSVG />{currencyFormat(user.priceRange.from)} ~ {currencyFormat(user.priceRange.to)}</small></li>}
				{user.rating === undefined ? undefined : <li><span>Rating</span><small><StarSVG />{user.rating}</small></li>}
				<li><span>Gender</span><small>{user.gender === "MALE" ? <MaleSVG /> : <FemaleSVG />}{capitalizeText(user.gender)}</small></li>
			</ul>
		</div>
	);
}

