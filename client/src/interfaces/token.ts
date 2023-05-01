export default interface Token {
	id: string;
	type: "Doctor" | "Patient";
	iat: Date;
	exp: Date;
}