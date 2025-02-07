"use client";
import React, { useState } from "react";
import Form from "./components/Form";
import ListView from "./components/ListView";

export default function Page() {
  const [editingAdmin, setEditingAdmin] = useState<any | null>(null);

  const handleEditAdmin = (admin: any) => {
    setEditingAdmin(admin);
  };

  const handleCancelEdit = () => {
    setEditingAdmin(null);
  };

  return (
    <main className="p-5 flex flex-col md:flex-row gap-5">
      <Form />
      <ListView onEditAdmin={handleEditAdmin} />
    </main>
  );
}
