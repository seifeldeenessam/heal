import { useEffect, useState } from "react";
import useAuthToken from "../../../hooks/auth-token";
import IAppointment from "../../../interfaces/appointment";
import IDoctor from "../../../interfaces/doctor";
import IPatient from "../../../interfaces/patient";
import Loading from "../../loading/loading";
import { ReactComponent as CalendarSVG } from './../../../assets/svgs/illustrations/calendar.svg';
import './appointments.css';
import DoctorAppointment from "./doctor-appointment";
import PatientAppointment from "./patient-appointment";

interface IProps {
	user: IDoctor & IPatient;
}

export default function Appointments({ user }: IProps) {
	const authToken = useAuthToken();
	const [appointments, setAppointments] = useState<IAppointment[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const controller = new AbortController();
		if (user._id && user.type) fetchAppointments(user._id, user.type);
		return () => controller.abort();
	}, [user]);

	async function fetchAppointments(id: string, type: string) {
		try {
			const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
			const response: IAppointment[] = await (await fetch(`${import.meta.env.VITE_API_URL}/appointments?document=${type.toLocaleLowerCase()}&id=${id}`, options)).json();
			setAppointments(response);
		} catch (error) {
			console.error("Request error", error);
		} finally {
			setLoading(false);
		}
	}
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
			<ul>{appointments.map((appointment) => authToken?.type === "PATIENT" ? <PatientAppointment appointment={appointment} key={appointment._id} /> : <DoctorAppointment appointment={appointment} key={appointment._id} />)}</ul>
		</div>
	);
}