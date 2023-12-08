export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  /*   const img = await sharp(body).resize(320, 240).toBuffer();
   */
  return body;
});
