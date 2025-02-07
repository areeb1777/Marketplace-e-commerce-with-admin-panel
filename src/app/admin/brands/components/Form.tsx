"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import toast from "react-hot-toast";
import { createNewBrand } from "../../../../../lib/firestore/brands/write";
import useSWR from 'swr';
import { fetcher } from "../../../../sanity/lib/utils/fetcher";

const fetchBrandsQuery = `*[_type == "brand"]{_id, name, image{asset->{_id, url}}}`;

interface FormData {
  name: string;
  [key: string]: any;
}

export default function Form() {
  const { mutate } = useSWR(fetchBrandsQuery, fetcher);
  const [data, setData] = useState<FormData>({ name: "" });
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleData = (key: string, value: any) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleCreate();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      if (image) {
        const createdBrand = await createNewBrand({ data, image });
        if (createdBrand) {
          toast.success("Brand created successfully!");
          setData({ name: "" });
          setImage(null);
          setImageUrl(null);
          await mutate();
        }
      } else {
        toast.error("Image is required!");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]">
      <h1 className="font-semibold">Create Brand</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="brand-image" className="text-gray-500 text-sm">
            Image <span className="text-red-500">*</span>
          </label>
          {imageUrl && (
            <div className="flex justify-center items-center p-3">
              <Image
                src={imageUrl}
                alt="brand-image"
                width={200}
                height={200}
                className="rounded-lg h-22"
              />
            </div>
          )}
          <input
            onChange={handleImageChange}
            id="brand-image"
            name="brand-image"
            type="file"
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="brand-name" className="text-gray-500 text-sm">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="brand-name"
            name="brand-name"
            type="text"
            placeholder="Enter Name"
            value={data.name}
            onChange={(e) => handleData("name", e.target.value)}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </div>
  );
}
