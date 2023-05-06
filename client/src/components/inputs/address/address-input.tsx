import { useEffect, useState } from 'react';
import DropdownInput from '../dropdown/dropdown-input';
import LocationsJSON from './../../../assets/jsons/loacations.json';
import './address-input.css';

interface IProps {
	name: string;
	setData: any;
}

interface ILocations {
	[key: string]: {
		cities: {
			[key: string]: {
				towns: string[];
			};
		};
	};
}

const loacations: ILocations = LocationsJSON;

function AddressInput({ name, setData }: IProps) {
	const [address, setAddress] = useState({ country: Object.keys(loacations)[0], city: undefined, town: undefined });

	useEffect(() => {
		setData((current: any) => ({ ...current, [name]: address }));
	}, [address]);

	const countries: string[] = Object.keys(loacations);
	const cities: string[] = address.country ? Object.keys(loacations[address.country].cities) : [];
	const towns: string[] = address.city ? loacations[address.country].cities[address.city].towns : [];

	return (
		<div className="address-input">
			<DropdownInput name='country' placeholder='Country' items={countries} setData={setAddress} data={address.country} />
			{address.country && <DropdownInput name='city' placeholder='City' items={cities} setData={setAddress} data={address.city} />}
			{address.city && <DropdownInput name='town' placeholder='Town' items={towns} setData={setAddress} data={address.town} />}
		</div>
	);
}

export default AddressInput;