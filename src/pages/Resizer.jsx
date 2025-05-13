import React, { useState } from "react";

function Resizer() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [format, setFormat] = useState("image/png");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleResize = () => {
    if (!image || !width || !height) return;

    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = parseInt(width);
      canvas.height = parseInt(height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const resizedImage = canvas.toDataURL(format);
      setPreview(resizedImage);
    };
  };

  const handleDownload = () => {
    if (!preview) return;
    const link = document.createElement("a");
    link.href = preview;
    link.download = `resized-image.${format.split("/")[1]}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-5xl h-[90vh]">
        
        {/* Left Panel - Controls */}
        <div className="w-full md:w-1/2 p-6 overflow-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Image Resizer & Converter
          </h2>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
          />

          {image && (
            <>
              <div className="flex gap-4 mb-4">
                <input
                  type="number"
                  placeholder="Width"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-1/2 border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-1/2 border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
              >
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPEG</option>
                <option value="image/webp">WEBP</option>
              </select>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleResize}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Resize & Convert
                </button>
                <button
                  onClick={handleDownload}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Download
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right Panel - Image Preview */}
        <div className="w-full md:w-1/2 bg-gray-200 p-4 flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain rounded shadow"
            />
          ) : (
            <div className="text-gray-500 text-center">
              Upload an image to preview it here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Resizer;
