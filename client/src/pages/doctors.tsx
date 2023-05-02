import { useEffect, useState } from "react";
import Grid from "../components/grid/grid";
import IDoctor from "../interfaces/doctor";
import NoData from "../components/header/not-data/no-data";
import Loading from "../components/loading/loading";
import DoctorCard from "../components/doctor-card/doctor-card";

export default function DoctorsPage() {
	const [doctors, setDoctors] = useState<IDoctor[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const controller = new AbortController();
		(async () => await getDoctors())();
		return () => controller.abort();
	}, []);

	async function getDoctors(): Promise<void> {
		try {
			const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
			const response: IDoctor[] = await (await fetch(`${import.meta.env.VITE_API_URL}/doctors`, options)).json();
			setDoctors(response);
		} catch (error) {
			console.error("Request error", error);
		} finally {
			setLoading(false);
		}
	}

	if (loading) return <Loading />;
	if (doctors.length === 0) return <NoData />;
	return <Grid>{doctors.map((doctor) => <DoctorCard data={doctor} key={doctor._id} />)}</Grid>;
}