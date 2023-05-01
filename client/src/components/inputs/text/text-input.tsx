import { useState } from 'react';
import handleChange from '../../../utilities/handle-change';
import Button from '../../button/button';
import { ReactComponent as EyeClosedSVG } from './../../../assets/svgs/icons/eye-closed.svg';
import { ReactComponent as EyeSVG } from './../../../assets/svgs/icons/eye.svg';
import './text-input.css';

interface IProps {
	name: string;
	placeholder: string;
	setData: any;
	secured?: boolean;
}

function TextInput({ secured = false, name, placeholder, setData }: IProps) {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	if (secured) {
		return (
			<div className='password-input'>
				<input type={isVisible ? "text" : "password"} name={name} placeholder={placeholder} onChange={(event) => handleChange({ name, value: event.target.value, setter: setData })} />
				<Button condition='primary' icon={isVisible ? <EyeClosedSVG /> : <EyeSVG />} action={() => setIsVisible((current) => !current)} />
			</div>
		);
	} else {
		return <input type={"text"} name={name} placeholder={placeholder} onChange={(event) => handleChange({ name, value: event.target.value, setter: setData })} />;
	}
}

export default TextInput;