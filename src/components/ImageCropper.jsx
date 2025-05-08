import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { useDropzone } from "react-dropzone";
import getCroppedImg from "../utils/cropImage";

function ImageCropper() {
  const [rotation, setRotation] = useState(0);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const cropped = await getCroppedImg(image, croppedAreaPixels, rotation); // Add rotation
      setCroppedImage(cropped);
    } catch (e) {
      console.error(e);
    }
  }, [image, croppedAreaPixels, rotation]);

  return (
    <div className="w-full max-w-4xl flex flex-col gap-4 items-center">
      {!image ? (
        <div
          {...getRootProps()}
          className="w-full h-64 border-2 border-dashed border-gray-500 rounded-lg flex items-center justify-center cursor-pointer"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the image here...</p>
          ) : (
            <p>Drag & drop an image, or click to select one</p>
          )}
        </div>
      ) : (
        <>
          <div className="relative w-full h-[400px] bg-black rounded-md overflow-hidden">
            <Cropper
              rotation={rotation}
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="flex flex-col items-center w-full">
            <label htmlFor="rotation" className="text-sm text-gray-300">
              Rotate: {rotation}°
            </label>
            <input
              id="rotation"
              type="range"
              min={0}
              max={360}
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-64"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={showCroppedImage}
              className="bg-green-500 px-4 py-2 rounded text-white"
            >
              Crop & Show
            </button>
            <button
              onClick={() => {
                setImage(null);
                setCroppedImage(null);
              }}
              className="bg-red-500 px-4 py-2 rounded text-white"
            >
              Reset
            </button>
          </div>
        </>
      )}

      {croppedImage && (
        <div className="flex flex-col items-center">
          <p className="text-lg font-medium mb-2">Cropped Image:</p>
          <img
            src={croppedImage}
            alt="Cropped"
            className="rounded border border-gray-700"
          />
          <a
            href={croppedImage}
            download="cropped-image.png"
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}

export default ImageCropper;