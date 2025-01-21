import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid'; 

// this image upload the file 
const uploadsDir = path.join(process.cwd(), 'src','uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${uuidv4().split('-')[0]}${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit files to 5 MB
});


// Function to delete a file
function deleteFile(filename:string) {
  const filePath = path.join(uploadsDir, filename);

  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file ${filename}:`, err);
      } else {
        console.log(`File ${filename} deleted successfully.`);
      }
    });
  } else {
    console.log(`File ${filename} does not exist.`);
  }
}


export const fileUploader = {
  upload,
  uploadsDir,
  deleteFile
};
