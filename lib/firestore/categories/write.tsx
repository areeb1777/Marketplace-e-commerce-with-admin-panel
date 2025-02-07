import { createClient } from "next-sanity";
import { SanityImageAssetDocument } from "@sanity/client";
import { apiVersion, dataset, projectId, token } from "../../../src/sanity/env";
import { Slug } from "../../../src/sanity/lib/utils/slug";

interface CategoryData {
  name: string;
  slug: Slug;
  [key: string]: any;
}

interface CreateCategoryParams {
  data: CategoryData;
  image: File;
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

export const createNewCategory = async ({
  data,
  image,
}: CreateCategoryParams) => {
  if (!image) throw new Error("Image is required");
  if (!data?.name) throw new Error("Name is required");
  if (!data?.slug) throw new Error("Slug is required");

  const imageAsset = await uploadImage(image);

  try {
    const createdCategory = await client.create({
      _type: "category",
      ...data,
      picture: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      },
    });
    return createdCategory;
  } catch (error: unknown) {
    const typedError = error as { message?: string };
    throw new Error("Category creation failed");
  }
};
