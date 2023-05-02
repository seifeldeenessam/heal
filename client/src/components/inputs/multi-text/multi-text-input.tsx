import { ArrowRight, X } from '@phosphor-icons/react';
import { useState } from 'react';
import Button from '../../button/button';
import './multi-text-input.css';

interface IProps {
	values: string[];
	name: string;
	placeholder: string;
	setData: any;
}

function MultiTextInput({ values, name, placeholder, setData }: IProps) {
	const [newValue, setNewValue] = useState<string>("");

	function handleSubmit() {
		newValue !== "" && setData((current: any) => ({ ...current, [name]: [...current[name], newValue] }));
		newValue !== "" && setNewValue("");
	}

	function removeItem(index: number) {
		setData((current: any) => {
			const updatedData = { ...current };
			updatedData[name] = [...current[name]];
			updatedData[name].splice(index, 1);
			return updatedData;
		});
	}

	return (
		<div className='multi-text-input'>
			<div className="input">
				<input type="text" name={name} placeholder={placeholder} value={newValue} onChange={(event) => setNewValue(event.target.value)} />
				<Button condition='secondary' action={handleSubmit} icon={<ArrowRight />} />
			</div>
			{values.length === 0
				? undefined
				: <ul>{values.map((value, index) => <li key={index}><Button condition='secondary' action={() => removeItem(index)} icon={<X />} /><small>{value}</small></li>)}</ul>
			}
		</div>
	);
}

export default MultiTextInput;