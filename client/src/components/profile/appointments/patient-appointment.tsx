import { ArrowRight, CalendarCheck, CaretDown, ChatCenteredDots, Check, Coins, FirstAid, Star, X } from "@phosphor-icons/react";
import { Dispatch, useState } from "react";
import IAppointment from "../../../interfaces/appointment";
import IMessage from "../../../interfaces/message";
import capitalizeText from "../../../utilities/capitalize-text";
import currencyFormat from "../../../utilities/currency-format";
import dataFormat from "../../../utilities/date-format";
import Button from "../../button/button";
import NumberInput from "../../inputs/number/number-input";
import TextInput from "../../inputs/text/text-input";

export default function PatientAppointment({ appointment }: { appointment: IAppointment; }) {
	const [expanded, setExpanded] = useState<boolean>(false);

	function renderForms() {
		if (appointment.status === "DONE" && !appointment.review) {
			return <ReviewForm appointmentId={appointment._id!} setExpanded={setExpanded} />;
		} else if (appointment.status === "PENDDING" || appointment.status === "CONFIRMED") {
			return <RespondForm appointmentId={appointment._id!} setExpanded={setExpanded} />;
		} else {
			return undefined;
		}
	}

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
				{appointment.review && <div><span>Review</span><small><Star />{appointment.review.rate}</small><small><ChatCenteredDots />{appointment.review.comment}</small></div>}
				<p>{appointment.description}</p>
			</div>
			{renderForms()}
		</li>
	);
}

function RespondForm({ appointmentId, setExpanded }: { appointmentId: string; setExpanded: Dispatch<React.SetStateAction<boolean>>; }) {
	async function addRespond(status: IAppointment["status"]) {
		try {
			const options: RequestInit = { method: "POST", body: new Blob([JSON.stringify({ _id: appointmentId, status })], { type: 'application/json' }), cache: "no-store" };
			const response: IMessage = await (await fetch(`${import.meta.env.VITE_API_URL}/appointments/respond`, options)).json();
			alert(response.response);
			setExpanded(false);
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
	_id: string;
	comment: string;
	rate: number;
}

function ReviewForm({ appointmentId, setExpanded }: { appointmentId: string; setExpanded: Dispatch<React.SetStateAction<boolean>>; }) {
	const [review, setReview] = useState<IAppointmentReview>();

	async function addReview() {
		if (!review?.comment) return alert("You have to include a comment");
		if (review?.rate === 0) return alert("Are you sure about the (0) rate?");
		try {
			const options: RequestInit = { method: "POST", body: new Blob([JSON.stringify({ ...review, _id: appointmentId })], { type: 'application/json' }), cache: "no-store" };
			const response: IMessage = await (await fetch(`${import.meta.env.VITE_API_URL}/appointments/review`, options)).json();
			alert(response.response);
			setExpanded(false);
		} catch (error) {
			console.error("Request error", error);
		}
	}

	return <form className="footer">
		<TextInput name="comment" placeholder="Any comments?" setData={setReview} />
		<NumberInput name="rate" data={review?.rate ?? 0} setData={setReview} max={5} />
		<Button condition="secondary" action={addReview} icon={<ArrowRight />} />
	</form>;
}
