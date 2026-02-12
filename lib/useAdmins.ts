import useSWR from "swr";
import { fetcher } from "../src/sanity/lib/utils/fetcher";

interface Admin {
  _id: string;
  name: string;
  email: string;
  image?: string;
}

const ADMINS_QUERY = `*[_type == "admin"]{_id, name, email, "image": image.asset->url}`;

export function useAdmins() {
  const { data, error, isLoading, mutate } = useSWR<Admin[]>(
    ADMINS_QUERY,
    fetcher
  );

  return {
    data: data ?? [],
    error: error ? String(error) : null,
    isLoading,
    mutate,
  };
}
