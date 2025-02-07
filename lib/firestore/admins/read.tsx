"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  getAuth,
  onAuthStateChanged,
  User,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useAdmins } from "../../../lib/useAdmins";

const ReadAdmins = () => {
  const [user, setUser] = useState<User | null>(null);
  const { data: admins, error, isLoading } = useAdmins();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleSignIn = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  if (!user) {
    return (
      <div>
        <p>You must be signed in to view this page.</p>
        <button onClick={handleSignIn}>Sign in</button>
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
          <li key={admin.id}>
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
