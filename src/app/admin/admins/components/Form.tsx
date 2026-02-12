"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";
import { createNewAdmin } from "../../../../../lib/firestore/admins/write";
import { useAdmins } from "../../../../../lib/useAdmins";

interface FormData {
  name: string;
  email: string;
  [key: string]: any;
}

export default function Form() {
  const { mutate } = useAdmins();
  const [data, setData] = useState<FormData>({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleData = (key: string, value: any) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const createdAdmin = await createNewAdmin({ data });
      if (createdAdmin) {
        toast.success("Admin created successfully!");
        setData({ name: "", email: "" });
        await mutate();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]">
      <h1 className="font-semibold">Create Admin</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="admin-name" className="text-gray-500 text-sm">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="admin-name"
            name="admin-name"
            type="text"
            placeholder="Enter Name"
            value={data.name}
            onChange={(e) => handleData("name", e.target.value)}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="admin-email" className="text-gray-500 text-sm">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="admin-email"
            name="admin-email"
            type="email"
            placeholder="Enter Email"
            value={data.email}
            onChange={(e) => handleData("email", e.target.value)}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </form>
    </div>
  );
}
