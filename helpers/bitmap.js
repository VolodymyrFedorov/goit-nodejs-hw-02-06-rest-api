import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";
import { isNum } from "./index.js";
import { JIMP_SUPPORTED_EXTNAMES } from "../constants/index.js";

/**
 * @param {string} filePath
 * @param {object} options
 * @returns {string}
 */

const resize = async (
  filePath,
  { width: w, height: h, jpeg: qual, cover, removeOriginal } = {}
) => {
  let img = await Jimp.read(filePath);

  let saveAsJpeg = qual >= 0 || qual <= 100;

  let newFilePath =
    saveAsJpeg && !img._originalMime.endsWith("jpeg")
      ? filePath.replace(/(?<=\.)\w{3,4}$/, "jpg")
      : filePath;

  if (isNum(w) && isNum(h)) {
    cover ? img.cover(w, h) : img.resize(w, h);
  }
  saveAsJpeg && img.quality(qual);

  await img.writeAsync(newFilePath);

  if (removeOriginal && newFilePath !== filePath) {
    await fs.unlink(filePath);
  }

  return newFilePath;
};

const checkFileFormat = async (filePath) => {
  const extname = path.extname(filePath).toLowerCase().slice(1);
  if (!JIMP_SUPPORTED_EXTNAMES.includes(extname))
    throw Error("Unsupported format");
};

export const bitmap = {
  resize,
  checkFileFormat,
};
