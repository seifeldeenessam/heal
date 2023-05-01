export default function currencyFormat(number: number): string {
	const formatter = Intl.NumberFormat('en', { maximumSignificantDigits: 3, style: "currency", currency: "EGP" });
	return formatter.format(number);
}