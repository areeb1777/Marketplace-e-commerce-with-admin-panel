import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { getUserRole } from "../firebase"; // Import the getUserRole function

const handleAuthStateChanged = () => {
  const auth = getAuth();
  const router = useRouter();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const role = await getUserRole(user.uid);
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/home");
      }
    } else {
      router.push("/login");
    }
  });
};

export { handleAuthStateChanged };
