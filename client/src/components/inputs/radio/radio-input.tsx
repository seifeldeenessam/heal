import handleChange from '../../../utilities/handle-change';
import './radio-input.css';

interface IPorps {
	label: string;
	name: string;
	values: string[];
	data?: string;
	setData: any;
}

function RadioInput({ label, name, values, data, setData }: IPorps) {
	return (
		<div className="radio-input">
			<small>{label}</small>
			<ul>
				{values.map((value: string, index) => <li className={data?.toLowerCase() === value.toLowerCase() ? 'selected' : undefined} onClick={() => handleChange({ name, value: value.toUpperCase(), setter: setData })} key={index}>{value}</li>)}
			</ul>
		</div>
	);
}

export default RadioInput;