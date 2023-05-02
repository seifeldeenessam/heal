import { CalendarCheck, CaretDown, Check, Coins, Drop, Virus, X } from "@phosphor-icons/react";
import { useState } from "react";
import IAppointment from "../../../interfaces/appointment";
import capitalizeText from "../../../utilities/capitalize-text";
import currencyFormat from "../../../utilities/currency-format";
import dataFormat from "../../../utilities/date-format";
import Button from "../../button/button";
import TextInput from "../../inputs/text/text-input";

interface IAppointmentRespond {
	id: string;
	cost?: number;
	status: "CONFIRMED" | "CANCELED";
}

export default function DoctorAppointment({ appointment }: { appointment: IAppointment; }) {
	const [expanded, setExpanded] = useState<boolean>(false);
	const [respond, setRespond] = useState<IAppointmentRespond>();

	async function addRespond(status: IAppointment["status"]) {
		if (status === "CONFIRMED" && !respond?.cost) return alert("Appointment cost should be set");
		try {
			const options: RequestInit = { method: "POST", body: new Blob([JSON.stringify({ ...respond, id: appointment._id, status })], { type: 'application/json' }), cache: "no-store" };
			await (await fetch(`${import.meta.env.VITE_API_URL}/appointments/respond`, options)).json();
			setTimeout(() => setExpanded(false), 1000);
		} catch (error) {
			console.error("Request error", error);
		}
	}

	return (
		<li>
			<div className="header" onClick={() => setExpanded((current: boolean) => !current)}>
				<img src={`${import.meta.env.VITE_API_URL}/uploads/${appointment.patient.image}`} alt={appointment.patient.name} loading='lazy' />
				<div className="details">
					<span>{appointment.patient.name}</span>
					<small className={appointment.status}>{capitalizeText(appointment.status)}</small>
				</div>
				<Button condition='secondary' icon={<CaretDown />} className={expanded ? "rotated" : undefined} />
			</div>
			<div className={expanded ? "body expanded" : "body"}>
				{appointment.cost && <div><span>Cost</span><small><Coins />{currencyFormat(appointment.cost)}</small></div>}
				<div><span>Due date</span><small><CalendarCheck />{dataFormat(appointment.date.toString())}</small></div>
				<div><span>Blood type</span><small><Drop />{appointment.patient.bloodType}</small></div>
				<div><span>Diseases</span><small><Virus />{appointment.patient.diseases.join(", ")}</small></div>
				<p>{appointment.description}</p>
			</div>
			{appointment.status === "PENDDING" && <form className="footer">
				<TextInput name="cost" placeholder="How much will it cost?" setData={setRespond} />
				<Button condition="success" action={() => addRespond("CONFIRMED")} icon={<Check />} />
				<Button condition="fail" action={() => addRespond("CANCELED")} icon={<X />} />
			</form>}
		</li>
	);
}