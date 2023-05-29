import { PaperPlaneTilt } from '@phosphor-icons/react';
import Button from '../button/button';
import TextInput from '../inputs/text/text-input';
import { ReactComponent as LogoSVG } from './../../assets/svgs/branding/logo.svg';
import './footer.css';

function Footer() {
	return (
		<footer>
			<section id='copyrights'>
				<LogoSVG />
				<span>Copyrights © 2023</span>
			</section>
			<section>
				<h6>Help</h6>
				<ul>
					<li>Shipping</li>
					<li>Payments and invoices</li>
					<li>My purchases</li>
					<li>Exchanges, returns and refunds</li>
				</ul>
			</section>
			<section>
				<h6>Policies</h6>
				<ul>
					<li>Privacy policy</li>
					<li>Purchase conditions</li>
					<li>Cookies settings</li>
				</ul>
			</section>
			<section id='newsletter'>
				<h6>Newsletter</h6>
				<form onSubmit={(e) => e.preventDefault()}>
					<TextInput name='email' placeholder='Email address' setData={null} />
					<Button type='submit' condition='secondary' icon={<PaperPlaneTilt />} />
				</form>
				<p>By submitting your email address, you will be automatically subscribed to our newsletter system, which means that you will receive emails with our offers, new products, news, and more.</p>
			</section>
		</footer>
	);
}

export default Footer;