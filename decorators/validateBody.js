import { HttpError } from "../helpers/index.js";
import { HTTP_STATUS } from "../constants/index.js";
import Joi from "joi";

export const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      if (Joi.isSchema(schema)) {
        req.validatedBody = await schema.validateAsync(req.body);
      }
      next();
    } catch (err) {
      next(HttpError(HTTP_STATUS.badRequest, err.message));
    }
  };
};
