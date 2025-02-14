"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
// this image upload the file 
const uploadsDir = path_1.default.join(process.cwd(), 'src', 'uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueName = `${(0, uuid_1.v4)().split('-')[0]}${file.originalname}`;
        cb(null, uniqueName);
    },
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit files to 5 MB
});
// Function to delete a file
function deleteFile(filename) {
    const filePath = path_1.default.join(uploadsDir, filename);
    if (fs_1.default.existsSync(filePath)) {
        fs_1.default.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file ${filename}:`, err);
            }
            else {
                console.log(`File ${filename} deleted successfully.`);
            }
        });
    }
    else {
        console.log(`File ${filename} does not exist.`);
    }
}
exports.fileUploader = {
    upload,
    uploadsDir,
    deleteFile
};
