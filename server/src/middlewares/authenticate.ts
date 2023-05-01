import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utilities/tokens';

function authenticate(req: Request, res: Response, next: NextFunction) {
	const token = req.cookies["auth_token"];
	if (!token) return res.status(401).json({ succeed: false, response: "Authentication required" });
	if (!verifyToken(token)) return res.status(401).json({ succeed: false, response: "Invalid token" });
	next();
}

export default authenticate;