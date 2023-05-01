import { ChangeEvent, useEffect, useState } from 'react';
import './file-input.css';

interface IProps {
	name: string;
	setData: any;
}

function FileInput({ name, setData }: IProps) {
	const [value, setValue] = useState<File>();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => setData((current: any) => ({ ...current, [name]: value })), [value]);

	function onChange(e: ChangeEvent<HTMLInputElement>) {
		setValue(e.target.files![0]);
	}

	return (
		<div className="file-input">
			<input type="file" name={name} accept="image/png, image/jpg, image/jpeg" onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)} />
			<span className={value?.name ? "selected" : undefined}>{value?.name ?? "Choose image"}</span>
		</div>
	);
}

export default FileInput;