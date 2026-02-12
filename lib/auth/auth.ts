import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { fetcher } from "../../src/sanity/lib/utils/fetcher";

const handleAuthStateChanged = () => {
  const auth = getAuth();
  const router = useRouter();

  onAuthStateChanged(auth, async (user) => {
    if (user?.email) {
      const admins = await fetcher(
        `*[_type == "admin" && email == "${user.email}"]{_id}`
      );
      if (Array.isArray(admins) && admins.length > 0) {
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
