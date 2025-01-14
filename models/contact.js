import { model } from "mongoose";
import { hook } from "./hooks.js";
import { mongooseSchema as schema } from "../schemas/contacts/index.js";

schema.pre("findOneAndUpdate", hook.handlePreUpdateValidate);
schema.post("findOneAndUpdate", hook.handlePostSaveError);
schema.post("save", hook.handlePostSaveError);

export const Contact = model("contact", schema);
