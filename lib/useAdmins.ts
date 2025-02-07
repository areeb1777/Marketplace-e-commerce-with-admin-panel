import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Admin {
  id: string;
  name: string;
  email: string;
  image: string;
}

export function useAdmins() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "admins"));
        const adminsData: Admin[] = [];
        querySnapshot.forEach((doc) => {
          adminsData.push({ id: doc.id, ...doc.data() } as Admin);
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

    fetchAdmins();
  }, []);

  return { data: admins, error, isLoading };
}
