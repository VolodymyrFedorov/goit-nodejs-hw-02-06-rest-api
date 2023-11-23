import "dotenv/config";
import { uuid, sendEmail } from "./index.js";

const { BASE_URL: host } = process.env;

export const sendVerificationCode = async (to, code = uuid()) => {
  await sendEmail({
    to,
    subject: "Email verification",
    html: [
      `<a href="${host}/api/auth/verify/${code}"`,
      ` target="_blank" rel="noopener noreferrer nofollow">`,
      `Click to verify email address`,
      `</a>`,
    ].join(""),
  });

  return code;
};
