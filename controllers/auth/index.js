import { ctrlWrapperAsync, ctrlWrapper } from "../../decorators/index.js";
import { signin } from "./signin.js";
import { signup } from "./signup.js";
import { signout } from "./signout.js";
import { getCurrent } from "./getCurrent.js";
import { updateSubscription } from "./updateSubscription.js";
import { updateAvatar } from "./updateAvatar.js";

export const ctrl = {
  signup: ctrlWrapperAsync(signup),
  signin: ctrlWrapperAsync(signin),
  signout: ctrlWrapperAsync(signout),
  updateSubscription: ctrlWrapperAsync(updateSubscription),
  updateAvatar: ctrlWrapperAsync(updateAvatar),
  getCurrent: ctrlWrapper(getCurrent),
};
