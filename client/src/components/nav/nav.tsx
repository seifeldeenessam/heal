import { Link, useLocation } from 'react-router-dom';
import useAuthToken from '../../hooks/auth-token';
import { ReactComponent as LogoSVG } from './../../assets/svgs/branding/logo.svg';
import { ReactComponent as HomeFilledSVG } from './../../assets/svgs/icons/home-fill.svg';
import { ReactComponent as HomeSVG } from './../../assets/svgs/icons/home.svg';
import { ReactComponent as StethoscopeFilledSVG } from './../../assets/svgs/icons/stethoscope-fill.svg';
import { ReactComponent as StethoscopeSVG } from './../../assets/svgs/icons/stethoscope.svg';
import { ReactComponent as UserCircleFilledSVG } from './../../assets/svgs/icons/user-circle-fill.svg';
import { ReactComponent as UserCircleSVG } from './../../assets/svgs/icons/user-circle.svg';
import './nav.css';

function Nav() {
	const { pathname } = useLocation();
	const authToken = useAuthToken();

	const links = [
		{ to: "/", label: "Home", icon: pathname.split('/')[1] === "" ? <HomeFilledSVG /> : <HomeSVG /> },
		{ to: "/doctors", label: "Doctors", icon: pathname.split('/')[1] === "doctors" ? <StethoscopeFilledSVG /> : <StethoscopeSVG /> },
		{ to: authToken ? "/profile" : "/profile/sign-in", label: "Profile", icon: pathname.split('/')[1] === "profile" ? <UserCircleFilledSVG /> : <UserCircleSVG /> },
	];

	return (
		<nav>
			<Link to={'/'}><LogoSVG /></Link>
			<ul>{links.map((link, index) => <li key={index}><Link to={link.to} className={pathname.split('/')[1] === link.to.split('/')[1] ? "active" : undefined}>{link.icon}</Link></li>)}</ul>
		</nav>
	);
}

export default Nav;