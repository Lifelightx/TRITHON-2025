import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, 'uploads/images/'); // Path to the images folder
    } else if (file.mimetype.startsWith('video/')) {
      cb(null, 'uploads/videos/'); // Path to the videos folder
    } else {
      cb('Error: Invalid file type!');
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Check file type
const checkFileType = (file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png/;
  const allowedVideoTypes = /mp4|mov|avi|mkv/;

  const extname = allowedImageTypes.test(path.extname(file.originalname).toLowerCase()) ||
    allowedVideoTypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = allowedImageTypes.test(file.mimetype) ||
    allowedVideoTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Only images and videos are allowed!');
  }
};

// Init upload
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 100 * 1024 * 1024, // Limit file size to 100MB
  }
});

export default upload;
