import multer from "multer";
import path from "path";
import fs from "fs";

// Caminho absoluto para o diretório de uploads
const uploadDir: string = path.resolve(__dirname, "./uploads");

// Certifique-se de que o diretório de uploads existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const time = Date.now(); // Use Date.now() para obter um timestamp
    callback(null, `${time}_${file.originalname}`);
  },
});

export default storage;
