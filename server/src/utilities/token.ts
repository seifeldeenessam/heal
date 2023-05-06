import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserType from 'src/types/user-type';

class TokenUtilities {
	static createToken(id: string, type: UserType): string {
		const secret: string = `${process.env.AUTH_TOKEN_SECRET}`;
		const token: string = jwt.sign({ id, type }, secret, { expiresIn: '2 days' });
		return token;
	}

	static verifyToken(token: string): boolean {
		let isValid: boolean = false;
		const secret: string = `${process.env.AUTH_TOKEN_SECRET}`;
		jwt.verify(token, secret, (error, payload) => error ? console.log(error) : isValid = true);
		return isValid;
	}

	static authenticate(req: Request, res: Response, next: NextFunction) {
		const token = req.cookies["auth_token"];
		if (!token) return res.status(401).json({ succeed: false, response: "Authentication required" });
		if (!this.verifyToken(token)) return res.status(401).json({ succeed: false, response: "Invalid token" });
		next();
	}
}

export default TokenUtilities;