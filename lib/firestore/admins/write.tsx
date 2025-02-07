import { db } from '../../firebase';
import { collection, addDoc } from "firebase/firestore";

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
    const docRef = await addDoc(collection(db, "admins"), data);
    return docRef.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Admin creation failed: ${error.message}`);
    } else {
      throw new Error("Admin creation failed: Unknown error");
    }
  }
};
