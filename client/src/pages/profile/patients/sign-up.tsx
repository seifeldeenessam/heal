import { SyntheticEvent, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from "react-router-dom";
import Form from "../../../components/form/form";
import FileInput from "../../../components/inputs/file/file-input";
import MultiTextInput from "../../../components/inputs/multi-text/multi-text-input";
import RadioInput from "../../../components/inputs/radio/radio-input";
import TextInput from "../../../components/inputs/text/text-input";
import IMessage from "../../../interfaces/message";
import IPatient from "../../../interfaces/patient";
import handleResponse from "../../../utilities/handle-repsonse";
import { ReactComponent as PatientsSVG } from './../../../assets/svgs/illustrations/patients.svg';

export default function PatientsSignUpPage() {
	const navigate = useNavigate();
	const [data, setData] = useState<IPatient>({ name: "", email: "", phone: "", image: "", password: "", birthdate: new Date("2000-01-01"), gender: "MALE", diseases: [], bloodType: "A+" });
	const [message, setMessage] = useState<IMessage>({ succeed: null, response: null });
	const [loading, setLoading] = useState<boolean>(false);

	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData();
		formData.append("data", JSON.stringify(data));
		formData.append("image", data!.image);

		try {
			const options: RequestInit = { method: "POST", body: formData, cache: "no-store", credentials: "include" };
			const response: IMessage = await (await fetch(`${import.meta.env.VITE_API_URL}/patients/sign-up`, options)).json();
			handleResponse({ setMessage: setMessage, response, navigate });
		} catch (error) {
			console.error("Request error", error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Form onSubmit={onSubmit} title='Welcome to Voithy' message={message} loading={loading} link={{ to: "/profile/doctors/sign-up", label: "Are you a doctor? sign up here" }} illustration={<PatientsSVG />}>
			<TextInput name='name' placeholder='Full name' setData={setData} />
			<TextInput name='email' placeholder='Email address' setData={setData} />
			<TextInput name='phone' placeholder='Phone number' setData={setData} />
			<FileInput name="image" setData={setData} />
			<TextInput name='password' placeholder='Password' setData={setData} secured />
			<DatePicker selected={data?.birthdate} placeholderText="Birthdate" onChange={(date: Date) => setData((current) => ({ ...current!, birthdate: date }))} dateFormat="dd-MM-yyyy" showMonthDropdown showYearDropdown />
			<RadioInput label="Gender" name="gender" values={["male", "female"]} data={data?.gender} setData={setData} />
			<RadioInput label="Blood type" name="bloodType" values={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} data={data?.bloodType} setData={setData} />
			<MultiTextInput values={data!.diseases} name="diseases" placeholder="Diseases" setData={setData} />
		</Form>
	);
}
