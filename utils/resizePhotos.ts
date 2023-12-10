import Resizer from "react-image-file-resizer";

export const resizeFile = (file: Blob, size: number, format: string) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      size,
      size,
      format,
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
