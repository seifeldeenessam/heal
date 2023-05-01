import multer, { diskStorage } from "multer";

const storage = diskStorage({
	destination: (request, file, callback) => {
		callback(null, process.env.ENVIRONMENT === "DEVELOPMENT" ? './src/uploads/' : './dist/uploads/');
	},
	filename: (request, file, callback) => {
		callback(null, `${Date.now()}.${file.originalname.split(".").slice(-1)}`);
	},
});

const upload = multer({ storage });

export default upload;