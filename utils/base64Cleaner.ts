export const cleanBase64 = (base64String: string) => {
  const cleanedBase64 = base64String.replace(
    /^data:image\/(png|jpg|jpeg|webp);base64,/,
    ""
  );
  return cleanedBase64;
};
