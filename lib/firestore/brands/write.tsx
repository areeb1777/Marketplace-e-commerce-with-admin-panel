import { createClient } from "next-sanity";
import { SanityImageAssetDocument } from "@sanity/client";
import { apiVersion, dataset, projectId, token } from "../../../src/sanity/env";

interface BrandData {
  name: string;
  [key: string]: any;
}

interface CreateBrandParams {
  data: BrandData;
  image?: File;
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

export const uploadImage = async (
  image: File
): Promise<SanityImageAssetDocument> => {
  try {
    const imageAsset = await client.assets.upload("image", image, {
      filename: image.name,
    });
    return imageAsset;
  } catch (error: unknown) {
    const typedError = error as { message?: string };
    throw new Error(
      `Image upload failed: ${typedError.message || "Unknown error"}`
    );
  }
};

export const createNewBrand = async ({
  data,
  image,
}: CreateBrandParams) => {
  if (!data?.name) throw new Error("Name is required");

  let imageAsset;
  if (image) {
    imageAsset = await uploadImage(image);
  }

  try {
    const createdBrand = await client.create({
      _type: "brand",
      ...data,
      image: imageAsset
        ? {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageAsset._id,
            },
          }
        : undefined, 
    });
    return createdBrand;
  } catch (error: unknown) {
    const typedError = error as { message?: string };
    throw new Error("Brand creation failed");
  }
};
