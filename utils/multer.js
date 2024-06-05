import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (req.originalUrl === '/account/profile-update') {
      cb(null, 'public/images/uploads/profilepics');
    } else {
      cb(null, 'public/images/uploads/covers');
    }
  },
  filename(req, file, cb) {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

export default upload;
