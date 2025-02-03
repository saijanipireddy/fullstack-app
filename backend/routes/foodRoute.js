import express from 'express'

import { addFood,foodList ,removeFood} from '../controllers/foodController.js'
import fs from 'fs'
import path from 'path'
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Simulating __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure "uploads" directory exists

const uploadDir = join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Store in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
  },
});

const upload = multer({ storage: storage });




foodRouter.post("/add", upload.single("image"),addFood);
foodRouter.get('/list', foodList);
foodRouter.post('/remove', removeFood);

export default foodRouter
