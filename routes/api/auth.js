import express from "express";
import fs from "fs/promises";
import { joiSchema as schema } from "../../schemas/users/index.js";
import { ctrl } from "../../controllers/auth/index.js";
import { mdw } from "../../middlewares/index.js";
import * as decor from "../../decorators/index.js";


export const router = express.Router();

router.post(
  /\/(signup|register)/,
  decor.validateBody(schema.signup),
  mdw.isUserExists,
  ctrl.signup
);

router.post(/\/(signin|login)/, decor.validateBody(schema.signin), ctrl.signin);

router.post(/\/(signout|logout)/, mdw.authenticate, ctrl.signout);

router.get("/verify/:verificationCode", ctrl.verifyEmail);

router.post(
  "/verify",
  decor.validateBody(schema.verifyEmail),
  ctrl.resendVerificationCode
);

router.get("/current", mdw.authenticate, ctrl.getCurrent);

router.patch(
  /\/(subscription|sub)/,
  mdw.authenticate,
  decor.validateBody(schema.updateSubscription),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  mdw.authenticate,
  decor.uploadSingleImage("avatar"),
  mdw.processAvatarFile,
  ctrl.updateAvatar,
  mdw.removeAvatarOnError
);
