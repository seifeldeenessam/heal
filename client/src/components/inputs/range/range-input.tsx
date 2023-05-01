import { useEffect, useState } from 'react';
import './range-input.css';

interface IProps {
	label: string;
	name: string;
	setData: any;
}

interface IRange {
	from: number | undefined;
	to: number | undefined;
}

function RangeInput({ label, name, setData }: IProps) {
	const [newValue, setNewValue] = useState<IRange>({ from: undefined, to: undefined });

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { !isNaN(newValue.from!) && setData((current: any) => ({ ...current, [name]: newValue })); }, [newValue]);

	return (
		<div className='range-input'>
			<small>{label}</small>
			<div className="inputs">
				<input type="text" name="from" className={newValue.from ? "set" : undefined} placeholder='From' onChange={(event) => setNewValue((current) => ({ ...current, "from": Number.parseInt(event.target.value) }))} />
				<input type="text" name="to" className={newValue.to ? "set" : undefined} placeholder='To' onChange={(event) => setNewValue((current) => ({ ...current, "to": Number.parseInt(event.target.value) }))} />
			</div>
		</div>
	);
}

export default RangeInput;