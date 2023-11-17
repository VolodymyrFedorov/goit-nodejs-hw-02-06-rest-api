import { crypt, Avatar } from "../../helpers/index.js";
import { HTTP_STATUS, AVATAR_OPTIONS } from "../../constants/index.js";
import { User } from "../../models/index.js";

const { gravaTheme: theme, size } = AVATAR_OPTIONS;

export const signup = async ({ body, file }, res) => {
  const { name, email, password } = body;

  const avatarUrl =
    file?.avatarUrl ?? Avatar.getGravatarUrl(email, { theme, size });

  await User.create({
    ...body,
    password: await crypt.hash(password),
    avatarUrl,
  });

  res.status(HTTP_STATUS.created).json({
    name,
    email,
    avatarUrl,
  });
};
