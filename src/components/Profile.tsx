'use client';
import React, { useEffect, useState } from 'react';
import { getAuth, signOut, User } from 'firebase/auth';
import { auth, initFirebase } from '../../lib/firebase'; // Ensure correct imports
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

initFirebase(); // Initialize Firebase App

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authInstance = getAuth();
    const unsubscribe = authInstance.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  const emailAddress = user.email;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/'); // Redirect to home page after sign-out
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center mb-6">
          <Image
            src={user.photoURL || '/icons/default-profile.png'}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full border-2 border-gray-300"
          />
          <div className="ml-6">
            <h2 className="text-3xl font-bold">{user.displayName}</h2>
            <p className="text-gray-700">{emailAddress}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Account Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Display Name</label>
              <p className="border rounded-md p-2 bg-gray-100">{user.displayName}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <p className="border rounded-md p-2 bg-gray-100">{emailAddress}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <Link href="/settings">
            <span className="text-blue-600 hover:underline">Edit Profile</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
