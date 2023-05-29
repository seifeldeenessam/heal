import { House, Stethoscope, UserCircle } from '@phosphor-icons/react';
import { Link, useLocation } from 'react-router-dom';
import useAuthToken from '../../hooks/auth-token';
import { ReactComponent as LogoSVG } from './../../assets/svgs/branding/logo.svg';
import './header.css';

function Header() {
	const { pathname } = useLocation();
	const authToken = useAuthToken();

	const links = [
		{ to: "/", label: "Home", icon: pathname.split('/')[1] === "" ? <House weight='fill' /> : <House /> },
		{ to: "/doctors", label: "Doctors", icon: pathname.split('/')[1] === "doctors" ? <Stethoscope weight='fill' /> : <Stethoscope /> },
		{ to: authToken ? "/profile" : "/profile/sign-in", label: "Profile", icon: pathname.split('/')[1] === "profile" ? <UserCircle weight='fill' /> : <UserCircle /> },
	];

	return (
		<header>
			<LogoSVG />
			<nav>{links.map((link, index) => <Link key={index} to={link.to} className={pathname.split('/')[1] === link.to.split('/')[1] ? "active" : undefined}>{link.icon}</Link>)}</nav>
		</header>
	);
}

export default Header;