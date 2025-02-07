"use client";
import { Button } from "@nextui-org/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Link from "next/link";
import toast from "react-hot-toast";
import { auth } from "../../../../lib/firebase";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useRouter } from "next/navigation";

function SignInWithGoogleComponent() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User:", user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
    setIsLoading(false);
  };

  return (
    <Button isLoading={isLoading} isDisabled={isLoading} onPress={handleLogin}>
      Sign In With Google
    </Button>
  );
}

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);
  return (
    <main className="w-full flex justify-center items-center bg-gray-200 p-10 md:p-24 min-h-screen">
      <section className="flex flex-col gap-3">
        <header className="font-bold text-xl text-center">Avion</header>
        <div className="flex flex-col gap-3 bg-white p-5 md:p-10 rounded-xl md:min-w-[440px] w-full">
          <h1 className="font-bold text-xl">Login With Email</h1>
          <form className="flex flex-col gap-3">
            <input
              placeholder="Enter Your Email"
              type="email"
              name="user-email"
              id="user-email"
              className="px-3 py-2 rounded-xl border focus:outline-none"
              aria-label="Enter your email"
            />
            <input
              placeholder="Enter Your Password"
              type="password"
              name="user-password"
              id="user-password"
              className="px-3 py-2 rounded-xl border focus:outline-none"
              aria-label="Enter your password"
            />
            <Button color="primary">Login</Button>
          </form>
          <div className="flex justify-between">
            <Link href="/sign-up">
              <button className="font-semibold text-sm text-blue-700">
                New? Create an account
              </button>
            </Link>
            <Link href="/forget-password">
              <button className="font-semibold text-sm text-blue-700">
                Forget Password?
              </button>
            </Link>
          </div>
          <hr />
          <SignInWithGoogleComponent />
        </div>
      </section>
    </main>
  );
}
