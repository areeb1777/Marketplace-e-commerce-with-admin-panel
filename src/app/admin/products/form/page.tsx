"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation"; 
import BasicDetails from "./components/BasicDetails";
import Images from "./components/Images";
import Description from "./components/Description";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token } from "../../../../sanity/env";
import { v4 as uuidv4 } from "uuid";
import { ImageFile } from "../../../../types";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

interface Data {
  [key: string]: any;
}

export default function Page() {
  const [data, setData] = useState<Data>({});
  const [featureImage, setFeatureImage] = useState<ImageFile | null>(null);
  const [imageList, setImageList] = useState<ImageFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams ? searchParams.get("productId") : null;

  useEffect(() => {
    if (productId) {
      const fetchProductData = async () => {
        const product =
          await client.fetch(`*[_type == "product" && _id == "${productId}"]{
          _id, title, slug, shortDescription, price, salePrice, stock, orders, brand, category, width, height, depth, features, "featureImage": featureImage.asset->url, "additionalImages": additionalImages[].asset->url, description
        }[0]`);

        const descriptionText =
          product.description &&
          product.description[0] &&
          product.description[0].children &&
          product.description[0].children[0]
            ? product.description[0].children[0].text
            : "";

        setData({
          "product-title": product.title,
          "product-slug": product.slug.current,
          "product-short-description": product.shortDescription,
          "product-price": product.price,
          "product-sale-price": product.salePrice,
          "product-stock": product.stock,
          "product-orders": product.orders,
          "product-brand": product.brand._ref,
          "product-category": product.category._ref,
          "product-width": product.width,
          "product-height": product.height,
          "product-depth": product.depth,
          "product-features": product.features.join(","),
          "product-description": descriptionText,
        });

        setFeatureImage(
          product.featureImage
            ? { url: product.featureImage, file: null }
            : null
        );
        setImageList(
          product.additionalImages
            ? product.additionalImages.map((url: string) => ({
                url,
                file: null,
              }))
            : []
        );
      };

      fetchProductData();
    }
  }, [productId]);

  const handleData = (key: string, value: any) => {
    setData((prevData) => ({
      ...(prevData ?? {}),
      [key]: value,
    }));
  };

  const isSupportedImageFormat = (file: File) => {
    const supportedFormats: string[] = ["image/jpeg", "image/png", "image/gif"];
    return supportedFormats.includes(file.type);
  };

  const uploadImageToSanity = async (file: File) => {
    if (!isSupportedImageFormat(file)) {
      throw new Error(`Unsupported image format: ${file.type}`);
    }

    try {
      const asset = await client.assets.upload("image", file, {
        contentType: file.type,
      });
      return asset._id;
    } catch (error: any) {
      console.error(`Image upload error: ${error.message}`);
      throw new Error(`Image upload failed: ${error.message}`);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Current state:", JSON.stringify(data, null, 2));
    console.log("Feature Image:", featureImage);
    console.log("Image List:", imageList);

    try {
      const featureImageId = featureImage?.file
        ? await uploadImageToSanity(featureImage.file)
        : featureImage?.url
          ? featureImage.url.split("/").pop()?.split("-").shift()
          : null;

      const additionalImageIds =
        imageList.length > 0
          ? await Promise.all(
              imageList.map((image) =>
                image.file
                  ? uploadImageToSanity(image.file)
                  : image.url
                    ? Promise.resolve(
                        image.url.split("/").pop()?.split("-").shift()
                      )
                    : Promise.resolve(null)
              )
            ).then((ids) => ids.filter((id) => id !== null) as string[])
          : [];

      console.log("Feature Image ID:", featureImageId);
      console.log("Additional Image IDs:", additionalImageIds);

      const newProduct: any = {
        _type: "product",
        title: data["product-title"],
        slug: {
          _type: "slug",
          current: data["product-slug"]
        },
        shortDescription: data["product-short-description"],
        brand: data["product-brand"]
          ? { _type: "reference", _ref: data["product-brand"] }
          : null,
        category: data["product-category"]
          ? { _type: "reference", _ref: data["product-category"] }
          : null,
        stock: data["product-stock"] ? parseInt(data["product-stock"], 10) : 0,
        price: data["product-price"] ? parseFloat(data["product-price"]) : 0,
        salePrice: data["product-sale-price"]
          ? parseFloat(data["product-sale-price"])
          : 0,
        width: data["product-width"] ? parseFloat(data["product-width"]) : 0,
        height: data["product-height"] ? parseFloat(data["product-height"]) : 0,
        depth: data["product-depth"] ? parseFloat(data["product-depth"]) : 0,
        features: data["product-features"]
          ? data["product-features"].split(",")
          : [],
        description: data["product-description"]
          ? [
              {
                _type: "block",
                _key: uuidv4(),
                children: [
                  { _type: "span", text: data["product-description"] },
                ],
              },
            ]
          : null,
        orders: data["product-orders"]
          ? parseInt(data["product-orders"], 10)
          : 0,
      };

      if (featureImageId) {
        newProduct.featureImage = {
          asset: { _type: "reference", _ref: featureImageId },
        };
      }
      if (additionalImageIds.length > 0) {
        newProduct.additionalImages = additionalImageIds.map((id) => ({
          asset: { _type: "reference", _ref: id },
          _key: `${id}-${Date.now()}`,
        }));
      }

      console.log("Product data:", JSON.stringify(newProduct, null, 2));

      if (productId) {
        await client.patch(productId).set(newProduct).commit();
        toast.success("Product updated successfully!");
      } else {
        await client.create(newProduct);
        toast.success("Product created successfully!");
      }

      router.push("/admin/products");

      setData({});
      setFeatureImage(null);
      setImageList([]);
    } catch (error: any) {
      console.error("Error:", error.message);
      toast.error("Failed to save product: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
      <div className="flex justify-between w-full items-center">
        <h1>{productId ? "Edit Product" : "Create new Product"}</h1>
        <Button type="submit" color="primary" disabled={isLoading}>
          {isLoading
            ? productId
              ? "Updating..."
              : "Creating..."
            : productId
              ? "Update"
              : "Create"}
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <BasicDetails data={data} handleData={handleData} />
        <div className="flex-1 flex flex-col gap-5">
          <Images
            featureImage={featureImage}
            imageList={imageList}
            setFeatureImage={setFeatureImage}
            setImageList={setImageList}
          />
          <Description data={data} handleData={handleData} />
        </div>
      </div>
    </form>
  );
}
