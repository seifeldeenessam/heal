import { useEffect, useState } from "react";
import useAuthToken from "../../../hooks/auth-token";
import IAppointment from "../../../interfaces/appointment";
import IDoctor from "../../../interfaces/doctor";
import IPatient from "../../../interfaces/patient";
import IUser from "../../../interfaces/user";
import capitalizeText from "../../../utilities/capitalize-text";
import currencyFormat from "../../../utilities/currency-format";
import dataFormat from "../../../utilities/date-format";
import Button from "../../button/button";
import TextInput from "../../inputs/text/text-input";
import { ReactComponent as CalendarCheckSVG } from './../../../assets/svgs/icons/calendar-check.svg';
import { ReactComponent as CaretDownSVG } from './../../../assets/svgs/icons/caret-down.svg';
import { ReactComponent as CheckSVG } from './../../../assets/svgs/icons/check.svg';
import { ReactComponent as CloseSVG } from './../../../assets/svgs/icons/close.svg';
import { ReactComponent as CoinsSVG } from './../../../assets/svgs/icons/coins.svg';
import { ReactComponent as DropSVG } from './../../../assets/svgs/icons/drop.svg';
import { ReactComponent as FirstAidSVG } from './../../../assets/svgs/icons/first-aid.svg';
import { ReactComponent as StarSVG } from './../../../assets/svgs/icons/star-empty.svg';
import { ReactComponent as VirusSVG } from './../../../assets/svgs/icons/virus.svg';
import { ReactComponent as CalendarSVG } from './../../../assets/svgs/illustrations/calendar.svg';
import './appointments.css';
import Loading from "../../loading/loading";

interface IProps {
	user: IUser & IDoctor & IPatient;
}

interface IAppointmentItemProps {
	appointment: IAppointment;
}

interface IAppointmentResponse {
	id: string;
	cost?: number;
	status: "CONFIRMED" | "CANCELED";
}

export default function Appointments({ user }: IProps) {
	const [appointments, setAppointments] = useState<IAppointment[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const controller = new AbortController();
		async function fetchUser(id: string, type: string) {
			try {
				const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
				const response: IAppointment[] = await (await fetch(`${import.meta.env.VITE_API_URL}/appointments/${type.toLocaleLowerCase()}/${id}`, options)).json();
				setAppointments(response);
			} catch (error) {
				console.error("Request error", error);
			} finally {
				setLoading(false);
			}
		}
		if (user._id && user.__t) fetchUser(user._id, user.__t);
		return () => controller.abort();
	}, [user]);

	if (loading) return <Loading expanded={false} />;

	if (appointments.length === 0) {
		return (
			<div className="appointments">
				<div className="no-data">
					<CalendarSVG />
					<span>No appointments available</span>
				</div>
			</div>
		);
	}

	return (
		<div className="appointments">
			<ul>{appointments.map((appointment) => <AppointmentItem appointment={appointment} key={appointment._id} />)}</ul>
		</div>
	);
}

function AppointmentItem({ appointment }: IAppointmentItemProps) {
	const authToken = useAuthToken();
	const [expanded, setExpanded] = useState<boolean>(false);
	const [data, setData] = useState<IAppointmentResponse>();

	async function respond(status: IAppointment["status"]) {
		if (status === "CONFIRMED" && !data?.cost) return alert("Appointment cost should be set");
		try {
			const options: RequestInit = { method: "POST", body: new Blob([JSON.stringify({ ...data, id: appointment._id, status })], { type: 'application/json' }), cache: "no-store" };
			await (await fetch(`${import.meta.env.VITE_API_URL}/appointments/respond`, options)).json();
			setTimeout(() => setExpanded(false), 1000);
		} catch (error) {
			console.error("Request error", error);
		}
	}

	if (authToken?.type === "Patient") {
		return (
			<li>
				<div className="header" onClick={() => setExpanded((current: boolean) => !current)}>
					<img src={`${import.meta.env.VITE_API_URL}/uploads/${appointment.doctor.image}`} alt={appointment.doctor.name} loading='lazy' />
					<div className="details">
						<span>{appointment.doctor.name}</span>
						<small className={appointment.status}>{capitalizeText(appointment.status)}</small>
					</div>
					<Button condition='secondary' icon={<CaretDownSVG />} className={expanded ? "rotated" : undefined} />
				</div>
				<div className={expanded ? "body expanded" : "body"}>
					{appointment.cost && <div><span>Cost</span><small><CoinsSVG />{currencyFormat(appointment.cost)}</small></div>}
					<div><span>Due date</span><small><CalendarCheckSVG />{dataFormat(appointment.date.toString())}</small></div>
					<div><span>Specializations</span><small><FirstAidSVG />{appointment.doctor.specializations.join(", ")}</small></div>
					<div><span>Rate</span><small><StarSVG />{appointment.doctor.rating}</small></div>
					<p>{appointment.description}</p>
				</div>
				{
					appointment.status === "PENDDING" || appointment.status === "CONFIRMED"
						? <form className="footer">
							<Button condition="success" className="fill" action={() => respond("DONE")} label="Done" icon={<CheckSVG />} />
							<Button condition="fail" className="fill" action={() => respond("CANCELED")} label="Cancel" icon={<CloseSVG />} />
						</form>
						: undefined
				}
			</li>
		);
	} else {
		return (
			<li>
				<div className="header" onClick={() => setExpanded((current: boolean) => !current)}>
					<img src={`${import.meta.env.VITE_API_URL}/uploads/${appointment.patient.image}`} alt={appointment.patient.name} loading='lazy' />
					<div className="details">
						<span>{appointment.patient.name}</span>
						<small className={appointment.status}>{capitalizeText(appointment.status)}</small>
					</div>
					<Button condition='secondary' icon={<CaretDownSVG />} className={expanded ? "rotated" : undefined} />
				</div>
				<div className={expanded ? "body expanded" : "body"}>
					{appointment.cost && <div><span>Cost</span><small><CoinsSVG />{currencyFormat(appointment.cost)}</small></div>}
					<div><span>Due date</span><small><CalendarCheckSVG />{dataFormat(appointment.date.toString())}</small></div>
					<div><span>Blood type</span><small><DropSVG />{appointment.patient.bloodType}</small></div>
					<div><span>Diseases</span><small><VirusSVG />{appointment.patient.diseases.join(", ")}</small></div>
					<p>{appointment.description}</p>
				</div>
				{appointment.status === "PENDDING" && <form className="footer">
					<TextInput name="cost" placeholder="How much will it cost?" setData={setData} />
					<Button condition="success" action={() => respond("CONFIRMED")} icon={<CheckSVG />} />
					<Button condition="fail" action={() => respond("CANCELED")} icon={<CloseSVG />} />
				</form>}
			</li>
		);

	}
}