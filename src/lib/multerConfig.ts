import multer from "fastify-multer";
import path from "node:path";
import fs from "fs";

const uploadDir: string = path.resolve(__dirname, "./uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const time = Date.now(); // Use Date.now() para obter um timestamp
    callback(null, `${time}_${file.originalname}`);
  },
});

export const upload = multer({ storage });
