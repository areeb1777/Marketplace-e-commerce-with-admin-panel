"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import useSWR from "swr";
import Image from "next/image";
import { fetcher } from "../../../../sanity/lib/utils/fetcher";
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, token } from '../../../../sanity/env';
import toast from "react-hot-toast";
import { Button } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

const fetchCategoriesQuery = `*[_type == "category"]{_id, name, slug, picture{asset->{_id, url}}}`;

const ListView = () => {
  const { data, error, isLoading, mutate } = useSWR(fetchCategoriesQuery, fetcher);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [updatedName, setUpdatedName] = useState<string>('');

  if (error) return <div>Failed to load categories: {error}</div>;
  if (isLoading) return <div>Loading...</div>;

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      try {
        await client.delete(id);
        toast.success("Category deleted successfully!");
        mutate();
      } catch (err) {
        toast.error("Failed to delete category");
      }
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setUpdatedName(category.name);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setUpdatedName('');
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    try {
      await client.patch(editingCategory._id)
        .set({ name: updatedName })
        .commit();
      toast.success("Category updated successfully!");
      mutate();
      handleCancelEdit();
    } catch (err) {
      toast.error("Failed to update category");
    }
  };

  return (
    <div className="flex-1 bg-white rounded-xl p-5 w-full">
      <h1 className="text-xl font-bold mb-4">Categories</h1>
      {editingCategory && (
        <form onSubmit={handleUpdate} className="mb-4">
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={updatedName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUpdatedName(e.target.value)}
              className="border px-4 py-2 rounded-lg w-full focus:outline-none"
            />
            <div className="flex gap-2">
              <Button type="submit" size="sm">Update</Button>
              <Button type="button" size="sm" onClick={handleCancelEdit}>Cancel</Button>
            </div>
          </div>
        </form>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-transparent">
          <thead className="bg-white">
            <tr>
              <th className="py-2">SN</th>
              <th className="py-2">Image</th>
              <th className="py-2">Name</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((category: any, index: number) => (
              <tr key={category._id} className="text-center bg-white">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  {category.picture && (
                    <Image
                      src={category.picture.asset.url}
                      alt={category.name}
                      width={50}
                      height={50}
                      className="rounded-lg"
                    />
                  )}
                </td>
                <td className="border px-4 py-2">{category.name}</td>
                <td className="border px-4 py-2">
                  <div className="flex gap-1 justify-center">
                    <button
                      onClick={() => handleEdit(category)}
                      className="bg-blue-500 text-white px-2 py-1 rounded flex items-center justify-center"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
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
