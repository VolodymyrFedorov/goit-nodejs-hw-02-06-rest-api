import { HTTP_STATUS, AVATAR_OPTIONS } from "../../constants/index.js";
import { User } from "../../models/index.js";
import { crypt, Avatar, sendVerificationCode } from "../../helpers/index.js";

const { gravaTheme: theme, width: size } = AVATAR_OPTIONS;

export const signup = async ({ body }, res) => {
  const { name, email, password } = body;

  const { avatarUrl } = await User.create({
    ...body,
    avatarUrl: Avatar.getGravatarUrl(email, { theme, size }),
    verificationCode: await sendVerificationCode(email),
    password: await crypt.hash(password),
  });

  res.status(HTTP_STATUS.created).json({
    name,
    email,
    avatarUrl,
  });
};
