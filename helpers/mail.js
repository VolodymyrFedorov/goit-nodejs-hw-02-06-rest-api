import "dotenv/config";
import mailer from "nodemailer";

const {
  EMAIL_HOST: host,
  EMAIL_PORT: port,
  EMAIL_USER: user,
  EMAIL_PASS: pass,
} = process.env;

const transport = mailer.createTransport({
  host,
  port,
  secure: true,
  auth: { user, pass },
});

export const sendEmail = async (data) => {
  return await transport.sendMail({ ...data, from: user });
};
