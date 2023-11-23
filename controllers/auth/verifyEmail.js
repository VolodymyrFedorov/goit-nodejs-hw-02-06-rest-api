import { HTTP_STATUS } from "../../constants/index.js";
import { HttpError } from "../../helpers/index.js";
import { User } from "../../models/index.js";

const MESSAGE = {
  verifiedSuccess: "Email successfully verified",
  userNotFound: "User not found",
};

export const verifyEmail = async ({ params: { verificationCode } }, res) => {
  const user = await User.findOneAndUpdate(
    { verificationCode },
    {
      verified: true,
      verificationCode: null,
    }
  );

  if (!user) {
    throw HttpError(HTTP_STATUS.notFound, MESSAGE.userNotFound);
  }

  res.json({ message: MESSAGE.verifiedSuccess });
};
