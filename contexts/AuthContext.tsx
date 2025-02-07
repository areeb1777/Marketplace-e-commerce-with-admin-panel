"use client";

import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { auth } from "../lib/firebase";

interface AuthContextType {
  user: any;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading: user === undefined }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
