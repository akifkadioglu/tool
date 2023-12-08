import Jimp from "jimp";

export const Resharp = (path: string) => {
  if (path == "") {
    return;
  }
  Jimp.read(path)
    .then((lenna: any) => {
      return lenna
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write("lena-small-bw.jpg"); // save
    })
    .catch((err: any) => {
      console.error(err);
    });
};
