export default async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const rotRad = (rotation * Math.PI) / 180;

  // Calculate bounding box of rotated image
  const sin = Math.abs(Math.sin(rotRad));
  const cos = Math.abs(Math.cos(rotRad));
  const width = image.width;
  const height = image.height;
  const bboxWidth = width * cos + height * sin;
  const bboxHeight = width * sin + height * cos;

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Translate and rotate
  ctx.translate(-pixelCrop.x, -pixelCrop.y);
  ctx.translate(bboxWidth / 2, bboxHeight / 2);
  ctx.rotate(rotRad);
  ctx.translate(-width / 2, -height / 2);

  ctx.drawImage(image, 0, 0);

  return canvas.toDataURL("image/png");
}

function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = reject;
  });
}