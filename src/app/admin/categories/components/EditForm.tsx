"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import toast from "react-hot-toast";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token } from "../../../../sanity/env";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

interface EditFormProps {
  category: any;
  onClose: () => void;
  onUpdate: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ category, onClose, onUpdate }) => {
  const [data, setData] = useState({
    name: category.name,
    slug: category.slug.current,
  });
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(category.picture?.asset.url || null);
  const [isLoading, setIsLoading] = useState(false);

  const handleData = (key: string, value: any) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (image) {
        const formData = new FormData();
        formData.append('file', image, image.name);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Image upload failed');
        }
        const imageAsset = await response.json();
        await client.patch(category._id)
          .set({
            name: data.name,
            slug: { _type: 'slug', current: data.slug },
            picture: {
              _type: 'image',
              asset: { _type: 'reference', _ref: imageAsset._id }
            },
          })
          .commit();
      } else {
        await client.patch(category._id)
          .set({
            name: data.name,
            slug: { _type: 'slug', current: data.slug },
          })
          .commit();
      }
      toast.success("Category updated successfully!");
      onUpdate();
      onClose();
    } catch (error: any) {
      toast.error("Failed to update category: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-xl p-5 w-full md:w-[400px]">
        <h1 className="font-semibold">Edit Category</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="category-image" className="text-gray-500 text-sm">
              Image <span className="text-red-500">*</span>
            </label>
            {imageUrl && (
              <div className="flex justify-center items-center p-3">
                <Image
                  src={imageUrl}
                  alt="category-image"
                  width={200}
                  height={200}
                  className="rounded-lg h-22"
                />
              </div>
            )}
            <input
              onChange={handleImageChange}
              id="category-image"
              name="category-image"
              type="file"
              className="border px-4 py-2 rounded-lg w-full focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="category-name" className="text-gray-500 text-sm">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="category-name"
              name="category-name"
              type="text"
              placeholder="Enter Name"
              value={data.name}
              onChange={(e) => handleData("name", e.target.value)}
              className="border px-4 py-2 rounded-lg w-full focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="category-slug" className="text-gray-500 text-sm">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              id="category-slug"
              name="category-slug"
              type="text"
              placeholder="Enter Slug"
              value={data.slug}
              onChange={(e) => handleData("slug", e.target.value)}
              className="border px-4 py-2 rounded-lg w-full focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
