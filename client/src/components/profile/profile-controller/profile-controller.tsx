import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IDoctor from '../../../interfaces/doctor';
import IMessage from '../../../interfaces/message';
import IPatient from '../../../interfaces/patient';
import IUser from '../../../interfaces/user';
import Button from '../../button/button';
import AccountDetails from '../account-details/account-details';
import Appointments from '../appointments/appointments';
import './profile-controller.css';

interface IProps {
	user: IUser & IDoctor & IPatient;
}

export default function ProfileController({ user }: IProps) {
	const navigate = useNavigate();
	const [active, setActive] = useState<number>(0);
	const buttons = ["Account details", "Appointments"];
	const tabs: JSX.Element[] = [<AccountDetails user={user} />, <Appointments user={user} />];

	async function signOut(): Promise<void> {
		try {
			const options: RequestInit = { method: "GET", cache: "no-store", credentials: "include" };
			const response: IMessage = await (await fetch(`${import.meta.env.VITE_API_URL}/users/sign-out`, options)).json();
			if (response.succeed) setTimeout(() => {
				navigate('/', { replace: true });
				window.location.reload();
			}, 1000);
		} catch (error) {
			console.error("Request error", error);
		}
	}

	return (
		<section className='profile-controller'>
			<div className='side-bar'>
				<span>Hello {user.name.split(" ")[0]} 👋</span>
				<ul>{buttons.map((button, index) => <li className={active === index ? 'active' : undefined} onClick={() => setActive(index)} key={index}>{button}</li>)}</ul>
				<Button condition="primary" label={"Sign out"} action={signOut} />
			</div>
			<div className='content'>{tabs[active]}</div>
		</section>
	);
}

