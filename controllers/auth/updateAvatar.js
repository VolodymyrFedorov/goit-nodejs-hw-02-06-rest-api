import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { HttpError } from "../../helpers/index.js";
import { User } from "../../models/index.js";
import { HTTP_STATUS } from "../../constants/index.js";

const { PUBLIC_DIR, AVATARS_DIR } = process.env;

export const updateAvatar = async ({ user, file }, res) => {
  if (!file) {
    throw HttpError(HTTP_STATUS.badRequest, "avatar: need a file");
  }

  const { avatarUrl } = file;
  const { avatarUrl: oldAvatarUrl } = await User.findByIdAndUpdate(user._id, {
    avatarUrl,
  });

  if (oldAvatarUrl.startsWith(AVATARS_DIR)) {
    const fullName = path.resolve(PUBLIC_DIR, oldAvatarUrl);
    try {
      await fs.unlink(fullName);
    } catch {}
  }

  res.json({ avatarUrl });
};
