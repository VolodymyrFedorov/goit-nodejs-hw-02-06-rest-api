import "dotenv/config";
import path from "path";
import { Avatar, HttpError } from "../helpers/index.js";
import { HTTP_STATUS, AVATAR_OPTIONS } from "../constants/index.js";

const { PUBLIC_DIR, AVATARS_DIR } = process.env;
const AVATARS_PATH = path.join(PUBLIC_DIR, AVATARS_DIR);

const RESIZE_OPTIONS = {
  ...AVATAR_OPTIONS,
  jpeg: 60,
  cover: true,
  removeOriginal: true,
};

export const processAvatarFile = async (req, res, next) => {
  const { body, file } = req;
  const avatar = file && (await new Avatar(file.path));

  if (avatar) {
    await avatar.moveTo(AVATARS_PATH);

    try {
      await avatar.resize(RESIZE_OPTIONS);
    } catch {
      throw HttpError(
        HTTP_STATUS.unprocContent,
        `${file.fieldname}: possible broken bitmap`
      );
    } finally {
      file.newPath = avatar.path;

      file.avatarUrl = path
        .join(AVATARS_DIR, avatar.fileName)
        .replaceAll("\\", "/");
    }
  }

  next();
};
