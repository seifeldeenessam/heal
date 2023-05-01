import bcrypt from 'bcrypt';

export function comparePasswords(givenPassword: string, storedPassword: string): boolean {
	const compare = bcrypt.compareSync(givenPassword, storedPassword);
	return compare;
}

export function hashPassword(password: string): string {
	const saltRounds = 10;
	const hash = bcrypt.hashSync(password, saltRounds);
	return hash;
};

export function strongPassword(password: string): boolean {
	const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
	return strongPassword.test(password);
};