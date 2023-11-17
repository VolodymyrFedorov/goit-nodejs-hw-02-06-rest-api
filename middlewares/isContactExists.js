import { HttpError } from "../helpers/index.js";
import { HTTP_STATUS } from "../constants/index.js";
import { Contact } from "../models/index.js";

const ERR_ALREADY_EXISTS =
  "A contact with same phone or email is already in your list";

export const isContactExists = async ({ body, user }, res, next) => {
  const { email, phone } = body;
  const { _id: owner } = user;
  const found = await Contact.findOne({
    $and: [{ owner }],
    $or: [{ email }, { phone }],
  });

  if (found) throw HttpError(HTTP_STATUS.conflict, ERR_ALREADY_EXISTS);

  next();
};
