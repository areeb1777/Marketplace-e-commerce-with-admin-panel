"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Button } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { db } from "../../../../../lib/firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getGravatarUrl } from "../../../../../lib/utils/gravator";

interface Admin {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface ListViewProps {
  onEditAdmin: (admin: Admin) => void;
}

const ListView: React.FC<ListViewProps> = ({ onEditAdmin }) => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [updatedName, setUpdatedName] = useState<string>("");
  const [updatedEmail, setUpdatedEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "admins"));
      const adminsData: Admin[] = [];
      querySnapshot.forEach((doc) => {
        const adminData = doc.data();
        adminsData.push({
          id: doc.id,
          ...adminData,
          image: adminData.image || null,
        } as Admin);
      });
      setAdmins(adminsData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?"
    );
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "admins", id));
        toast.success("Admin deleted successfully!");
        fetchAdmins();
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(`Failed to delete admin: ${err.message}`);
        } else {
          toast.error("Failed to delete admin");
        }
      }
    }
  };

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin);
    setUpdatedName(admin.name);
    setUpdatedEmail(admin.email);
    onEditAdmin(admin);
  };

  const handleCancelEdit = () => {
    setEditingAdmin(null);
    setUpdatedName("");
    setUpdatedEmail("");
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingAdmin) return;

    try {
      await updateDoc(doc(db, "admins", editingAdmin.id), {
        name: updatedName,
        email: updatedEmail,
      });
      toast.success("Admin updated successfully!");
      fetchAdmins();
      handleCancelEdit();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Failed to update admin: ${err.message}`);
      } else {
        toast.error("Failed to update admin");
      }
    }
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });
    fetchAdmins();
  }, []);

  if (error) return <div>Failed to load admins: {error}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex-1 bg-white rounded-xl p-5 w-full">
      <h1 className="text-xl font-bold mb-4">Admins</h1>
      {editingAdmin && (
        <form onSubmit={handleUpdate} className="mb-4">
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={updatedName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUpdatedName(e.target.value)
              }
              className="border px-4 py-2 rounded-lg w-full focus:outline-none"
            />
            <input
              type="email"
              value={updatedEmail}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUpdatedEmail(e.target.value)
              }
              className="border px-4 py-2 rounded-lg w-full focus:outline-none"
            />
            <div className="flex gap-2">
              <Button type="submit" size="sm">
                Update
              </Button>
              <Button type="button" size="sm" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-transparent">
          <thead className="bg-white">
            <tr>
              <th className="py-2">SN</th>
              <th className="py-2">Profile Picture</th>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={admin.id} className="text-center bg-white">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  {user && user.email === admin.email ? (
                    <Image
                      src={user.photoURL || "/default-profile.png"}
                      alt={admin.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  ) : (
                    <Image
                      src={getGravatarUrl(admin.email)}
                      alt={admin.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  )}
                </td>
                <td className="border px-4 py-2">{admin.name}</td>
                <td className="border px-4 py-2">{admin.email}</td>
                <td className="border px-4 py-2">
                  <div className="flex gap-1 justify-center">
                    <button
                      onClick={() => handleEdit(admin)}
                      className="bg-blue-500 text-white px-2 py-1 rounded flex items-center justify-center"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(admin.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded flex items-center justify-center ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListView;
