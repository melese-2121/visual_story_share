import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { drag_and_drop } from "../../assets/images";
import Toast from "../../components/shared/Toast";

const ImageUploader = ({ onImageSelect }) => {
  const [imgUrl, setImgUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Filter only image files

      // Do something with the accepted image file
      if (acceptedFiles.length > 0) {
        setSelectedImage(acceptedFiles[0]);
        setImgUrl(URL.createObjectURL(acceptedFiles[0]));
        onImageSelect(acceptedFiles[0]);
      } else {
        onImageSelect(selectedImage, imgUrl);
      }
    },
    [selectedImage]
  );

  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg"],
    },
    excludeAcceptAllOption: true,
    multiple: false,
  });

  return (
    <div className="cursor-pointer text-center">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 mb-4 ${
          isDragActive ? "bg-gray-200" : "bg-white"
        }`}
      >
        {imgUrl ? (
          <div>
            <div>
              <img
                src={imgUrl}
                alt="Image"
                className="rounded-md w-full h-full"
              />
            </div>
            <div className="container mx-auto mt-5 text-center flex-1">
              <div className="text-center">
                <button className="change-image-btn" type="button">
                  Change Image
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <img
              src={drag_and_drop}
              alt="Image"
              className="mx-auto max-md:h-56 md:h-72 object-contain"
            />
            <h3 className="font-bold text-xl font-serif">
              Drag and drop your photo here
            </h3>
            <div className="container mx-auto my-4 text-center">
              <div className="text-center">
                <button
                  className="inline-block px-4 py-2 rounded-md text-zinc-800 focus:outline-none focus:ring focus:border-blue-300 bg-stone-300 hover:bg-stone-400"
                  type="button"
                >
                  Select From Computer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
