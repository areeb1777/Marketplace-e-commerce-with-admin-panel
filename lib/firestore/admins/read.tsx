"use client";

import React from "react";
import Image from "next/image";
import { useAdmins } from "../../useAdmins";
import { useAuth } from "../../../contexts/AuthContext";

const ReadAdmins = () => {
  const { user } = useAuth();
  const { data: admins, error, isLoading } = useAdmins();

  if (!user) {
    return (
      <div>
        <p>You must be signed in to view this page.</p>
      </div>
    );
  }

  if (error) return <div>Failed to load admins: {error}</div>;
  if (isLoading) return <div>Loading...</div>;

  const isAdmin = admins?.some((admin) => admin.email === user.email);
  if (!isAdmin) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div>
      <h1>Admins</h1>
      <ul>
        {admins.map((admin) => (
          <li key={admin._id}>
            <h2>{admin.name}</h2>
            <p>{admin.email}</p>
            {admin.image && (
              <Image
                src={admin.image}
                alt={admin.name}
                width={200}
                height={200}
                className="rounded-lg"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadAdmins;
