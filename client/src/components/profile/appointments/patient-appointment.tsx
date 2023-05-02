import { ArrowRight, CalendarCheck, CaretDown, Check, Coins, FirstAid, Star, X } from "@phosphor-icons/react";
import { Dispatch, useState } from "react";
import IAppointment from "../../../interfaces/appointment";
import capitalizeText from "../../../utilities/capitalize-text";
import currencyFormat from "../../../utilities/currency-format";
import dataFormat from "../../../utilities/date-format";
import Button from "../../button/button";
import NumberInput from "../../inputs/number/number-input";
import TextInput from "../../inputs/text/text-input";

export default function PatientAppointment({ appointment }: { appointment: IAppointment; }) {
	const [expanded, setExpanded] = useState<boolean>(false);

	return (
		<li>
			<div className="header" onClick={() => setExpanded((current: boolean) => !current)}>
				<img src={`${import.meta.env.VITE_API_URL}/uploads/${appointment.doctor.image}`} alt={appointment.doctor.name} loading='lazy' />
				<div className="details">
					<span>Dr. {appointment.doctor.name}</span>
					<small className={appointment.status}>{capitalizeText(appointment.status)}</small>
				</div>
				<Button condition='secondary' icon={<CaretDown />} className={expanded ? "rotated" : undefined} />
			</div>
			<div className={expanded ? "body expanded" : "body"}>
				{appointment.cost && <div><span>Cost</span><small><Coins />{currencyFormat(appointment.cost)}</small></div>}
				<div><span>Due date</span><small><CalendarCheck />{dataFormat(appointment.date.toString())}</small></div>
				<div><span>Specializations</span><small><FirstAid />{appointment.doctor.specializations.join(", ")}</small></div>
				<div><span>Rate</span><small><Star />{appointment.doctor.rating}</small></div>
				<p>{appointment.description}</p>
			</div>
			{appointment.status === "DONE" ? <ReviewForm setExpanded={setExpanded} /> : <RespondForm appointmentId={appointment._id!} setExpanded={setExpanded} />}
		</li>
	);
}

interface IAppointmentRespond {
	id: string;
	cost?: number;
	status: "CONFIRMED" | "CANCELED";
}

function RespondForm({ appointmentId, setExpanded }: { appointmentId: string; setExpanded: Dispatch<React.SetStateAction<boolean>>; }) {
	const [respond] = useState<IAppointmentRespond>();

	async function addRespond(status: IAppointment["status"]) {
		if (status === "CONFIRMED" && !respond?.cost) return alert("Appointment cost should be set");
		try {
			const options: RequestInit = { method: "POST", body: new Blob([JSON.stringify({ ...respond, id: appointmentId, status })], { type: 'application/json' }), cache: "no-store" };
			await (await fetch(`${import.meta.env.VITE_API_URL}/appointments/respond`, options)).json();
			setTimeout(() => setExpanded(false), 1000);
		} catch (error) {
			console.error("Request error", error);
		}
	}

	return <form className="footer">
		<Button condition="success" className="fill" action={() => addRespond("DONE")} label="Done" icon={<Check />} />
		<Button condition="fail" className="fill" action={() => addRespond("CANCELED")} label="Cancel" icon={<X />} />
	</form>;
}

interface IAppointmentReview {
	id: string;
	comment: string;
	rating: number;
}

function ReviewForm({ setExpanded }: { setExpanded: Dispatch<React.SetStateAction<boolean>>; }) {
	const [review, setReview] = useState<IAppointmentReview>();

	async function addReview() {
		if (!review?.comment) return alert("You have to include a comment");
		setExpanded(false);
	}

	return <form className="footer">
		<TextInput name="comment" placeholder="Any comments?" setData={setReview} />
		<NumberInput name="rating" data={review?.rating ?? 0} setData={setReview} max={5} />
		<Button condition="secondary" action={addReview} icon={<ArrowRight />} />
	</form>;
}
