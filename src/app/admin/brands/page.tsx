"use client";
import React, { useState } from "react";
import Form from "./components/Form";
import ListView from "./components/ListView";

export default function Page() {
  const [editingBrand, setEditingBrand] = useState<any | null>(null);

  const handleEditBrand = (brand: any) => {
    setEditingBrand(brand);
  };

  const handleCancelEdit = () => {
    setEditingBrand(null);
  };

  return (
    <main className="p-5 flex flex-col md:flex-row gap-5">
      <Form />
      <ListView onEditBrand={handleEditBrand} />
    </main>
  );
}
