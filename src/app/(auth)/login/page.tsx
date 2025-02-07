"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../lib/firebaseConfig";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import toast from "react-hot-toast";

function SignInWithGoogleComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User:", user);
      toast.success("Logged in with Google!");
      router.push("/dashboard"); // Redirect to dashboard after successful login
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

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User logged in:", user);
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } catch (error: unknown) {
      console.error("Error logging in:", error);
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setError("An unexpected error occurred");
        toast.error("An unexpected error occurred");
      }
    }
    setIsLoading(false);
  };

  return (
    <main className="w-full flex justify-center items-center bg-gray-200 p-10 md:p-24 min-h-screen">
      <section className="flex flex-col gap-3">
        <header className="font-bold text-xl text-center">Avion</header>
        <div className="flex flex-col gap-3 bg-white p-5 md:p-10 rounded-xl md:min-w-[440px] w-full">
          <h1 className="font-bold text-xl">Login With Email</h1>
          <form className="flex flex-col gap-3" onSubmit={handleEmailLogin}>
            <label htmlFor="user-email" className="font-medium">Email</label>
            <input
              placeholder="Enter Your Email"
              type="email"
              name="user-email"
              id="user-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 rounded-xl border focus:outline-none"
              aria-label="Enter your email"
              required
            />
            <label htmlFor="user-password" className="font-medium">Password</label>
            <input
              placeholder="Enter Your Password"
              type="password"
              name="user-password"
              id="user-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 rounded-xl border focus:outline-none"
              aria-label="Enter your password"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button color="primary" isLoading={isLoading} isDisabled={isLoading} type="submit">
              Login
            </Button>
          </form>
          <div className="flex justify-between">
            <Link href="/sign-up">
              <button className="font-semibold text-sm text-blue-700">
                New? Create an account
              </button>
            </Link>
            <Link href="/forget-password">
              <button className="font-semibold text-sm text-blue-700">
                Forgot Password?
              </button>
            </Link>
          </div>
          <hr />
          <SignInWithGoogleComponent />
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
