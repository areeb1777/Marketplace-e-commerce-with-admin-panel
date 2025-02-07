"use client";

import React, { ChangeEvent } from "react";
import Image from "next/image";
import { ImageFile } from "../../../../../types";

interface ImagesProps {
  featureImage: ImageFile | null;
  imageList: ImageFile[];
  setFeatureImage: (image: ImageFile | null) => void;
  setImageList: (images: ImageFile[]) => void;
}

const Images: React.FC<ImagesProps> = ({
  featureImage,
  imageList,
  setFeatureImage,
  setImageList,
}) => {
  const handleFeatureImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFeatureImage({ file: event.target.files[0] });
    }
  };

  const handleImageListChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newImages = Array.from(event.target.files).map((file) => ({
        file,
      }));
      setImageList([...imageList, ...newImages]);
    }
  };

  return (
    <section className="flex-1 flex flex-col gap-4 bg-white border p-4 rounded-xl shadow-md">
      <h1 className="font-semibold text-lg">Images</h1>
      <div className="flex flex-col gap-3">
        <label className="text-gray-500 text-sm font-medium">
          Feature Image
        </label>
        <input
          type="file"
          name="featureImage"
          onChange={handleFeatureImageChange}
          className="border px-4 py-2 rounded-lg w-full focus:outline-none"
        />
        {featureImage?.file && (
          <div className="relative">
            <Image
              src={URL.createObjectURL(featureImage.file)}
              alt="Feature Image"
              width={150}
              height={150}
              className="rounded-lg mt-3 shadow"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <button
              onClick={() => setFeatureImage(null)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center group-hover:bg-red-700 transition-all"
            >
              &times;
            </button>
          </div>
        )}
        {featureImage?.url && (
          <div className="relative">
            <Image
              src={featureImage.url}
              alt="Feature Image"
              width={150}
              height={150}
              className="rounded-lg mt-3 shadow"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <button
              onClick={() => setFeatureImage(null)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center group-hover:bg-red-700 transition-all"
            >
              &times;
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 mt-5">
        <label className="text-gray-500 text-sm font-medium">
          Additional Images
        </label>
        <input
          type="file"
          name="imageList"
          multiple
          onChange={handleImageListChange}
          className="border px-4 py-2 rounded-lg w-full focus:outline-none"
        />
        <div className="flex flex-wrap gap-3 mt-3">
          {imageList.map((image, index) => (
            <div key={index} className="relative group">
              {image.file && (
                <Image
                  src={URL.createObjectURL(image.file)}
                  alt={`Image ${index + 1}`}
                  width={100}
                  height={100}
                  className="rounded-lg shadow"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              )}
              {image.url && (
                <Image
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  width={100}
                  height={100}
                  className="rounded-lg shadow"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              )}
              <button
                onClick={() =>
                  setImageList(imageList.filter((_, i) => i !== index))
                }
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center group-hover:bg-red-700 transition-all"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Images;
