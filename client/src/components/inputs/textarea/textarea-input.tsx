import handleChange from '../../../utilities/handle-change';
import './textarea-input.css';

interface IProps {
	name: string;
	placeholder: string;
	setData: any;
}

export default function TextAreaInput({ name, placeholder, setData }: IProps) {
	return <textarea rows={5} name={name} placeholder={placeholder} onChange={(event) => handleChange({ name, value: event.target.value, setter: setData })} />;
}