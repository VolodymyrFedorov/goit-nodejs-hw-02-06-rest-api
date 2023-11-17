import multer from "multer";
import path from "path";
import { HttpError, uuid } from "../../helpers/index.js";
import {
  HTTP_STATUS,
  JIMP_SUPPORTED_FORMATS,
  JIMP_SUPPORTED_MIMETYPES,
} from "../../constants/index.js";

const destination = path.resolve("tmp");
export const MAX_FILE_SIZE = 1024 ** 2 * 5;
const SUPPORTED_FORMATS = JIMP_SUPPORTED_FORMATS.join(", ");
const isImageType = (mimeType) => JIMP_SUPPORTED_MIMETYPES.includes(mimeType);

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    file.extname = path.extname(file.originalname);
    cb(null, `${uuid()}${file.extname}`);
  },
});

const limits = {
  fileSize: MAX_FILE_SIZE,
};

const fileFilter = async (req, file, cb) => {
  const { fieldname, mimetype } = file;

  if (!isImageType(mimetype)) {
    return cb(
      HttpError(
        HTTP_STATUS.unprocContent,
        `${fieldname}: supported formats: ${SUPPORTED_FORMATS}`
      )
    );
  }
  cb(null, true);
};

export const uploadImage = multer({
  storage,
  limits,
  fileFilter,
});
