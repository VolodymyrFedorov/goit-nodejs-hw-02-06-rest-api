import { HTTP_STATUS } from "../../constants/index.js";
import { User } from "../../models/index.js";
import { HttpError, token as jwt, crypt } from "../../helpers/index.js";

const ERR_AUTH_FAILED = "email or password is invalid";

export const signin = async ({ body }, res) => {
  const { email, password } = body;

  const user = await User.findOne({ email });
  const success =
    user?.verified && (await crypt.compare(password, user?.password));

  if (!success) {
    throw HttpError(HTTP_STATUS.unauth, ERR_AUTH_FAILED);
  }

  const token = jwt.create(user._id);
  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token });
};
