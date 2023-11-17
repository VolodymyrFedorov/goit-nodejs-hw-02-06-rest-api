import path from "path";
import { Avatar, HttpError } from "../helpers/index.js";
import {
  HTTP_STATUS,
  AVATAR_OPTIONS,
  STATIC_PATH,
} from "../constants/index.js";

const { size, path: avatarsFolder } = AVATAR_OPTIONS;

const AVATARS_PATH = path.join(STATIC_PATH, avatarsFolder);

const RESIZE_OPTIONS = {
  width: size,
  height: size,
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
        .join(avatarsFolder, avatar.fileName)
        .replaceAll("\\", "/");
    }
  }

  next();
};
