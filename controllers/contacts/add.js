import { HTTP_STATUS } from "../../constants/index.js";
import { HttpError } from "../../helpers/index.js";
import { Contact } from "../../models/index.js";

export const add = async ({ body, user }, res) => {
  const { email, phone } = body;
  const { _id: owner } = user;
  const result = await Contact.create({ ...body, owner });
  res.status(HTTP_STATUS.created).json(result);
};
