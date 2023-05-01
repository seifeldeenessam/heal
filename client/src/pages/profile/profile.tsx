import { useEffect, useState } from "react";
import ProfileController from "../../components/profile/profile-controller/profile-controller";
import useAuthToken from "../../hooks/auth-token";
import IDoctor from "../../interfaces/doctor";
import IPatient from "../../interfaces/patient";
import IUser from "../../interfaces/user";
import Loading from "../../components/loading/loading";

export default function ProfilePage() {
	const authtoken = useAuthToken();
	const [user, setUser] = useState<IUser & IDoctor & IPatient>();

	useEffect(() => {
		const controller = new AbortController();
		if (authtoken) fetchUser(authtoken.id);
		return () => controller.abort();
	}, [authtoken]);

	async function fetchUser(id: string) {
		try {
			const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
			const response: IUser & IDoctor & IPatient = await (await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, options)).json();
			setUser(response);
		} catch (error) {
			console.error("Request error", error);
		}
	}

	if (!user) return <Loading />;
	return <ProfileController user={user} />;
}
