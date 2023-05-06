import multer, { diskStorage } from "multer";
import fs from 'fs';

class MulterUtilities {
	private storage;
	public uplaod;

	constructor() {
		this.storage = diskStorage({
			destination: (request, file, callback) => {
				const path = process.env.ENVIRONMENT === "DEVELOPMENT" ? './src/uploads/' : './dist/uploads/';
				fs.mkdirSync(path, { recursive: true });
				callback(null, path);
			},
			filename: (request, file, callback) => {
				callback(null, `${Date.now()}.${file.originalname.split(".").slice(-1)}`);
			},
		});
		this.uplaod = multer({ storage: this.storage });
	}
}

export default MulterUtilities;