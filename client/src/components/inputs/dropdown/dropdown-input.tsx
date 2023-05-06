import { CaretDown } from '@phosphor-icons/react';
import { useState } from 'react';
import Button from '../../button/button';
import './dropdown-input.css';

interface IProps {
	name: string;
	placeholder: string;
	items: string[];
	setData: any;
	data: string | undefined;
}

function DropdownInput({ name, placeholder, items, setData, data }: IProps) {
	const [expanded, setExpanded] = useState<boolean>(false);

	function expand(): void {
		setExpanded((current: boolean) => current = !current);
	}

	function select(value: string): void {
		setData((current: any) => ({ ...current, [name]: value }));
		setExpanded(false);
	}

	return (
		<div className='dropdown-input'>
			<div className={data ? "selected" : "selected none"} onClick={expand}>
				{data ?? placeholder}
				<Button condition='secondary' className={expanded ? "rotated" : undefined} icon={<CaretDown />} />
			</div>
			<ul className={expanded ? "options expanded" : "options"}>
				{items.map((item, index) => <li key={index} onClick={() => select(item)}>{item}</li>)}
			</ul>
		</div>
	);
}

export default DropdownInput;