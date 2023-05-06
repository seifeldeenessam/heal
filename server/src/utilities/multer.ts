import multer, { diskStorage } from "multer";

class MulterUtilities {
	private storage;
	public uplaod;

	constructor() {
		this.storage = diskStorage({
			destination: (request, file, callback) => {
				callback(null, process.env.ENVIRONMENT === "DEVELOPMENT" ? './src/uploads/' : './dist/uploads/');
			},
			filename: (request, file, callback) => {
				callback(null, `${Date.now()}.${file.originalname.split(".").slice(-1)}`);
			},
		});
		this.uplaod = multer({ storage: this.storage });
	}
}

export default MulterUtilities;