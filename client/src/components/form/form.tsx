import { ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IMessage from '../../interfaces/message';
import Button from '../button/button';
import './form.css';

interface IProps {
	onSubmit(event: SyntheticEvent): void;
	title?: string;
	children: ReactNode;
	message: IMessage;
	loading: boolean;
	link?: { to: string; label: string; };
	illustration?: ReactNode;
}

function Form({ onSubmit, children, message, loading, link, title, illustration }: IProps) {
	const [buttonLabel, setButtonLabel] = useState<IMessage>({ succeed: null, response: "Submit" });

	useEffect(() => {
		if (loading) setButtonLabel({ succeed: null, response: "Loading..." });
	}, [loading]);

	useEffect(() => {
		if (message.succeed !== null && message.response !== null) setButtonLabel(message);
		setTimeout(() => setButtonLabel({ succeed: null, response: "Submit" }), 3000);
	}, [message]);

	return (
		<div className="form-wrapper">
			<form onSubmit={onSubmit}>
				{title && <div className='header'>{title}</div>}
				<div className='body'>{children}</div>
				<div className="footer">
					<Button type='submit' condition={buttonLabel.succeed === null ? 'primary' : buttonLabel.succeed ? 'success' : 'fail'} label={buttonLabel.response} />
					{link && <Link to={link.to}>{link.label}</Link>}
				</div>
			</form>
			{illustration}
		</div>
	);
}

export default Form;