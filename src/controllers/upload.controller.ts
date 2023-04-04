import * as path from 'path';
import * as multer from 'multer';
import { GetCurrentDate } from '../utils/utils.get.current-date';

const storageImage = multer.diskStorage({
  destination: './src/public/images/uploads/',
  filename: (req, file, cb) => {
    const date = new GetCurrentDate().getYearMonthDate();
    cb(null, date + '_' + file.originalname);
  },
});

const verifyTypeFileUpload = (file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};

export const uploadImage = multer({
  storage: storageImage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    verifyTypeFileUpload(file, cb);
  },
});
