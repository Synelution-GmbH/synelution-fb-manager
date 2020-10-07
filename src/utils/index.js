import stream from 'stream';
import { promisify } from 'util';
import fs from 'fs';
import sharp from 'sharp';
import rimraf from 'rimraf';

export const pipeline = promisify(stream.pipeline);
export const checkCreatePath = async (path) => {
  try {
    await fs.promises.mkdir(path, { recursive: true });
  } catch (e) {
    console.log(e);
  }
};

export const deleteDirectory = (path) =>
  fs.promises.rmdir(path, { recursive: true });
// new Promise((resolve, reject) => {
//   rimraf(path, () => resolve('done'));
// });

export const saveFileAndResize = async ({
  uploadPath,
  fileName,
  savePath,
  resize,
}) => {
  try {
    // const test = await sharp(uploadPath).resize(...resize);
    // console.log(await test.metadata());
    // const jpeg = await test.jpeg({ quality: 80 });
    // console.log(await jpeg.metadata());
    // console.log(fileName.replace(test.format, jpeg.format));
    await sharp(uploadPath)
      .resize(...resize)
      .jpeg({ quality: 80 })
      .toFile(`${savePath}${fileName}`);
    return `${savePath.replace('public', '')}${fileName}`;
  } catch (e) {
    console.log(e);
    throw 'image couldnt be saved';
  }
};

export const saveFile = async ({ uploadPath, fileName, savePath }) => {
  await checkCreatePath(savePath);
  const readStream = fs.createReadStream(uploadPath);
  try {
    await pipeline(readStream, fs.createWriteStream(`${savePath}${fileName}`));
    return `${savePath.replace('public', '')}${fileName}`;
  } catch (error) {
    throw 'file couldnt be saved';
  }
};

export function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}
