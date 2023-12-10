export function addToZip(zip: any, base64: string, filename: string) {
  const imageData = atob(base64);
  const uint8Array = new Uint8Array(imageData.length);
  for (let i = 0; i < imageData.length; i++) {
    uint8Array[i] = imageData.charCodeAt(i);
  }
  zip.file(filename, uint8Array);
}
