import fs from "fs/promises";
import path from "path";
import { checkFileExists, HttpError } from "../../helpers/index.js";
import { User } from "../../models/index.js";
import {
  HTTP_STATUS,
  AVATAR_OPTIONS,
  STATIC_PATH,
} from "../../constants/index.js";

const { path: avatarsPath } = AVATAR_OPTIONS;

export const updateAvatar = async ({ user, file }, res) => {
  if (!file) {
    throw HttpError(HTTP_STATUS.badRequest, "avatar: need a file");
  }
  const { avatarUrl } = file;
  const { avatarUrl: oldAvatarUrl } = await User.findByIdAndUpdate(user._id, {
    avatarUrl,
  });

  if (oldAvatarUrl.startsWith(avatarsPath)) {
    const fullName = path.resolve(STATIC_PATH, oldAvatarUrl);
    try {
      await checkFileExists(fullName);
      await fs.unlink(fullName);
    } catch {}
  }

  res.json({ avatarUrl });
};
