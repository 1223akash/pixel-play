import ImageCropper from "../components/ImageCropper";

function Cropper() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-3xl font-bold mb-2">✂️ PixelPlay Cropper</h1>
      <ImageCropper />
    </div>
  );
}

export default Cropper;