import { useState } from "react";
import ImageCropper from "../components/ImageCropper";

function Cropper() {
  const [croppedImage, setCroppedImage] = useState(null);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-800 rounded-xl shadow-lg text-white">
      <h1 className="text-3xl font-bold text-center text-green-400 mb-6">
        ✂️ PixelPlay Cropper
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Cropper */}
        <div className="w-full md:w-1/2 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <ImageCropper onCrop={(img) => setCroppedImage(img)} />
        </div>

        {/* Right: Cropped Preview */}
        <div className="w-full md:w-1/2 bg-gray-900 p-4 rounded-lg border border-gray-700 flex items-center justify-center">
          {croppedImage ? (
            <div className="text-center">
              <p className="text-lg font-medium mb-2">🖼️ Cropped Preview</p>
              <img
                src={croppedImage}
                alt="Cropped"
                className="rounded border border-gray-700 mb-2 max-w-full"
              />
              <a
                href={croppedImage}
                download="cropped-image.png"
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
              >
                Download
              </a>
            </div>
          ) : (
            <p className="text-gray-400 text-center">
              Crop an image to see preview here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cropper;
