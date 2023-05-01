import jwt from 'jsonwebtoken';

export function createToken(id: string, type: string): string {
	const secret: string = `${process.env.AUTH_TOKEN_SECRET}`;
	const token: string = jwt.sign({ id, type }, secret, { expiresIn: '2 days' });
	return token;
}

export function verifyToken(token: string): boolean {
	let isValid: boolean = false;
	const secret: string = `${process.env.AUTH_TOKEN_SECRET}`;
	jwt.verify(token, secret, (error, payload) => error ? console.log(error) : isValid = true);
	return isValid;
}