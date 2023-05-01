import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/form/form';
import TextInput from '../../components/inputs/text/text-input';
import IMessage from '../../interfaces/message';
import handleResponse from '../../utilities/handle-repsonse';
import { ReactComponent as SignInSVG } from './../../assets/svgs/illustrations/sign-in.svg';

interface IData {
	email: string;
	password: string;
}

export default function SignInPage() {
	const navigate = useNavigate();
	const [data, setData] = useState<IData>({ email: "", password: "" });
	const [message, setMessage] = useState<IMessage>({ succeed: null, response: null });
	const [loading, setLoading] = useState<boolean>(false);

	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault();
		setLoading(true);
		try {
			if (!data) return setMessage({ succeed: false, response: "Can't proceed with empty values" });
			if (!data.password) return setMessage({ succeed: false, response: "Password must be provided" });
			const options: RequestInit = { method: "POST", body: new Blob([JSON.stringify(data)], { type: 'application/json' }), cache: "no-store", credentials: "include" };
			const response: IMessage = await (await fetch(`${import.meta.env.VITE_API_URL}/users/sign-in`, options)).json();
			handleResponse({ setMessage: setMessage, response, navigate });
		} catch (error) {
			console.error("Request error", error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Form onSubmit={onSubmit} title='Welcome back' message={message} loading={loading} link={{ to: "/profile/patients/sign-up", label: "New here? sign up now" }} illustration={<SignInSVG />}>
			<TextInput name='email' placeholder='Email address' setData={setData} />
			<TextInput name='password' placeholder='Password' setData={setData} secured />
		</Form>
	);
}
