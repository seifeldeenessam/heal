export default function capitalizeText(text: string) {
	return text.charAt(0).toUpperCase().concat(text.slice(1).toLowerCase());
}