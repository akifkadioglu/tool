import sharp from "sharp";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const img = await sharp(body).resize(320, 240).toBuffer();
  console.log(img)
  return img;
});
