import { SyntheticEvent, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import useAuthToken from '../../hooks/auth-token';
import IAppointment from '../../interfaces/appointment';
import IDoctor from '../../interfaces/doctor';
import IMessage from '../../interfaces/message';
import IUser from '../../interfaces/user';
import Button from '../button/button';
import Form from '../form/form';
import TextAreaInput from '../inputs/textarea/textarea-input';
import './modal.css';
import { X } from '@phosphor-icons/react';

interface IProps {
	setVisibility: any;
	doctor: IUser & IDoctor;
}

function Modal({ setVisibility, doctor }: IProps) {
	const authtoken = useAuthToken();
	const [data, setData] = useState<IAppointment>();
	const [message, setMessage] = useState<IMessage>({ succeed: null, response: null });
	const [loading, setLoading] = useState<boolean>(false);

	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault();
		setLoading(true);
		try {
			const options: RequestInit = { method: "POST", body: new Blob([JSON.stringify({ ...data, status: "PENDDING", doctor: doctor._id, patient: authtoken!.id })], { type: 'application/json' }), cache: "no-store" };
			const response: IMessage = await (await fetch(`${import.meta.env.VITE_API_URL}/appointments`, options)).json();
			setMessage(response);
			setTimeout(() => setVisibility(false), 1000);
		} catch (error) {
			console.error("Request error", error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<dialog className='modal'>
			<Button condition='primary' action={() => setVisibility(false)} icon={<X />} />
			<Form onSubmit={onSubmit} title={`Reserving with Dr. ${doctor.name}`} message={message} loading={loading}>
				<TextAreaInput name='description' placeholder='Describe what you feel' setData={setData} />
				<ReactDatePicker
					selected={data?.date ?? new Date()}
					placeholderText="Date"
					onChange={(date: Date) => setData((current) => ({ ...current!, date }))}
					timeFormat="hh:mm aa"
					timeIntervals={15}
					timeCaption="time"
					dateFormat="dd-MM-yyyy hh:mm aa"
					showTimeSelect
					showMonthDropdown
					showYearDropdown
				/>
			</Form>
		</dialog>
	);
}

export default Modal;