import fs from "fs/promises";

export const removeAvatarOnError = async ({ file }) => {
  if (file) await fs.unlink(file.newPath || file.path);
};
