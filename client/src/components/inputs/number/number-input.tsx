import { Minus, Plus } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import Button from '../../button/button';
import './number-input.css';

interface IProps {
	name: string;
	data: number;
	setData: any;
	min?: number;
	max?: number;
}

function NumberInput({ name, data, setData, min, max }: IProps) {
	const [value, setValue] = useState<number>(data);

	useEffect(() => {
		setData((current: any) => ({ ...current, [name]: value }));
	}, [value]);

	function decrease() {
		if (min) {
			if (value > min) setValue((current: number) => current - 1);
		} else {
			if (value > 0) setValue((current: number) => current - 1);
		}
	}

	function increase() {
		if (max) {
			if (value < max) setValue((current: number) => current + 1);
		} else {
			setValue((current: number) => current + 1);
		}
	}

	return (
		<div className="number-input">
			<Button condition="secondary" className="fill" action={decrease} icon={<Minus />} />
			<input type="text" name={name} value={data} readOnly />
			<Button condition="secondary" className="fill" action={increase} icon={<Plus />} />
		</div>
	);
}

export default NumberInput;