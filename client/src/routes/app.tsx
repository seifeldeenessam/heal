import { Route, Routes } from "react-router-dom";
import useAuthToken from "../hooks/auth-token";
import DoctorsPage from '../pages/doctors';
import ProfilePage from '../pages/profile/profile';
import ErrorPage from './../pages/error';
import HomePage from './../pages/home';
import DcotorsSignUpPage from './../pages/profile/doctors/sign-up';
import PatientsSignUpPage from './../pages/profile/patients/sign-up';
import SignInPage from './../pages/profile/sign-in';

export default function AppRoutes() {
	const authToken = useAuthToken();

	return (
		<Routes>
			<Route index element={<HomePage />} />
			<Route path='/doctors' element={<DoctorsPage />} />
			<Route path='/profile'>
				<Route path={!authToken ? undefined : ''} element={<ProfilePage />} />
				<Route path={!authToken ? 'sign-in' : undefined} element={<SignInPage />} />
				<Route path={!authToken ? 'doctors/sign-up' : undefined} element={<DcotorsSignUpPage />} />
				<Route path={!authToken ? 'patients/sign-up' : undefined} element={<PatientsSignUpPage />} />
			</Route>
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
}