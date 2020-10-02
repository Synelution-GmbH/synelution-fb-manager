import stream from 'stream';
import { promisify } from 'util';
import fs from 'fs';
export const pipeline = promisify(stream.pipeline);
export const checkCreatePath = async (path) => {
  try {
    await fs.promises.mkdir(path, { recursive: true });
  } catch (e) {
    console.log(e);
  }
};

export const saveFile = async ({ uploadPath, fileName, savePath }) => {
  await checkCreatePath(savePath);
  const readStream = fs.createReadStream(uploadPath);
  try {
    await pipeline(readStream, fs.createWriteStream(`${savePath}${fileName}`));
    return `${savePath.replace('public', '')}${fileName}`;
  } catch (error) {
    throw 'image couldnt be saved';
  }
};
