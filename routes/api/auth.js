import express from "express";
import fs from "fs/promises";
import { joiSchema as schema } from "../../schemas/users/index.js";
import { ctrl } from "../../controllers/auth/index.js";
import { mdw } from "../../middlewares/index.js";
import {
  validateBody,
  handleError,
  uploadSingleImage,
  uploadImage,
} from "../../decorators/index.js";

export const router = express.Router();

router.post(
  /\/(signup|register)/,
  uploadSingleImage("avatar"),
  validateBody(schema.signup),
  mdw.isUserExists,
  mdw.processAvatarFile,
  ctrl.signup,
  mdw.removeAvatarOnError
);

router.post(/\/(signin|login)/, validateBody(schema.signin), ctrl.signin);

router.post(/\/(signout|logout)/, mdw.authenticate, ctrl.signout);

router.get("/current", mdw.authenticate, ctrl.getCurrent);

router.patch(
  /\/(subscription|sub)/,
  mdw.authenticate,
  validateBody(schema.updateSubscription),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  mdw.authenticate,
  uploadSingleImage("avatar"),
  mdw.processAvatarFile,
  ctrl.updateAvatar,
  mdw.removeAvatarOnError
);
