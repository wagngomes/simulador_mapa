import multer from "multer"
import path from "path"
import fs from "fs"

const uploadDir: string = path.resolve(__dirname, "./uploads")


if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    const time = Date.now()
    callback(null, `${time}_${file.originalname}`)
  },
});

export default storage
