interface IProps {
	name: string;
	value: string | number | boolean;
	setter: any;
}

export default function handleChange({ name, value, setter }: IProps): void {
	if (value === '') {
		setter((prev: any) => ({ ...prev, [name]: null }));
	} else {
		setter((prev: any) => ({ ...prev, [name]: value }));
	}
}