import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import "dotenv/config";

const { JWT_SECRET, JWT_EXPIRES_IN, HASH_SALT } = process.env;

export const token = {
  create(id, expiresIn = JWT_EXPIRES_IN) {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn });
  },
  verify(token, key = JWT_SECRET) {
    try {
      return jwt.verify(token, key);
    } catch {
      return false;
    }
  },
  decode(token) {
    return jwt.decode(token);
  },
};

export const crypt = {
  async compare(s, hash) {
    try {
      return await bcrypt.compare(s, hash);
    } catch {
      return false;
    }
  },
  async hash(s, salt = HASH_SALT) {
    try {
      return await bcrypt.hash(s, Number(salt));
    } catch {
      return "";
    }
  },
};

export const uuid = () => {
  return crypto.randomUUID().replaceAll("-", "");
};

export const getHash = (str, algorithm = "md5") => {
  return crypto.createHash(algorithm).update(str).digest("hex");
};

export const rndStr = () => {
  return `${Date.now()}${Math.round(Math.random() * 1e9)}`;
};
