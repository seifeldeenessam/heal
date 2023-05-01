export default function dataFormat(date: string) {
	const unforamted = new Date(date);
	const day = unforamted.getDate().toString().padStart(2, '0');
	const month = (unforamted.getMonth() + 1).toString().padStart(2, '0');
	const year = unforamted.getFullYear().toString();
	const hour = (unforamted.getHours() % 12).toString().padStart(2, '0');
	const minute = unforamted.getMinutes().toString().padStart(2, '0');
	const meridiem = unforamted.getHours() < 12 ? 'AM' : 'PM';
	const formatted = `${day}/${month}/${year} - ${hour}:${minute} ${meridiem}`;
	return formatted;
}