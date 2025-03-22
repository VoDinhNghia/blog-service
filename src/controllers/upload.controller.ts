import * as path from 'path';
import { Request } from 'express';
import * as multer from 'multer';
import { GetCurrentDate } from '../utils/get.current-date.util';

const storageImage = multer.diskStorage({
  destination: './src/public/images/uploads/',
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const date = new GetCurrentDate().getYearMonthDate();
    cb(null, date + '_' + file.originalname);
  },
});

const verifyTypeFileUpload = (file: Express.Multer.File, cb) => {
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
  fileFilter: (req: Request, file: Express.Multer.File, cb) => {
    verifyTypeFileUpload(file, cb);
  },
});
