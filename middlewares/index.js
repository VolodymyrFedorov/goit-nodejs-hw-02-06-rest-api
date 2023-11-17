import { validateId } from "./validateId.js";
import { authenticate } from "./authenticate.js";
import { isUserExists } from "./isUserExists.js";
import { processAvatarFile } from "./processAvatarFile.js";
import { removeAvatarOnError } from "./removeAvatarOnError.js";
import { isContactExists } from "./isContactExists.js";
import {
  ctrlWrapper,
  ctrlWrapperAsync,
  handleError,
} from "../decorators/index.js";


export const mdw = {
  validateId: ctrlWrapperAsync(validateId),
  authenticate: ctrlWrapperAsync(authenticate),
  isUserExists: ctrlWrapperAsync(isUserExists),
  processAvatarFile: ctrlWrapperAsync(processAvatarFile),
  removeAvatarOnError: handleError(removeAvatarOnError),
  isContactExists: ctrlWrapperAsync(isContactExists),
};
