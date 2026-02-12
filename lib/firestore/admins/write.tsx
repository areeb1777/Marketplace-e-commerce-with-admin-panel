import { createClient } from "next-sanity";
import {
  apiVersion,
  dataset,
  projectId,
  token,
} from "../../../src/sanity/env";

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

interface AdminData {
  name: string;
  email: string;
}

interface CreateAdminParams {
  data: AdminData;
}

export const createNewAdmin = async ({ data }: CreateAdminParams) => {
  if (!data.name) throw new Error("Name is required");
  if (!data.email) throw new Error("Email is required");

  try {
    const result = await sanityClient.create({
      _type: "admin",
      name: data.name,
      email: data.email,
    });
    return result._id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Admin creation failed: ${error.message}`);
    } else {
      throw new Error("Admin creation failed: Unknown error");
    }
  }
};

export const updateAdmin = async (
  id: string,
  data: { name: string; email: string }
) => {
  try {
    await sanityClient.patch(id).set({ name: data.name, email: data.email }).commit();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Admin update failed: ${error.message}`);
    } else {
      throw new Error("Admin update failed: Unknown error");
    }
  }
};

export const deleteAdmin = async (id: string) => {
  try {
    await sanityClient.delete(id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Admin deletion failed: ${error.message}`);
    } else {
      throw new Error("Admin deletion failed: Unknown error");
    }
  }
};
