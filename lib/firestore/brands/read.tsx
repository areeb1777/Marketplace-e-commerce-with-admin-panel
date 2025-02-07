"use client";

import useSWR from "swr";
import Image from "next/image";
import { fetcher } from "../../../src/sanity/lib/utils/fetcher";

interface Brand {
  _id: string;
  name: string;
  picture?: { asset: { _id: string; url: string } };
}

export function useBrands() {
  const fetchBrandsQuery = `*[_type == "brand"]{_id, name, picture{asset->{_id, url}}}`;
  const { data, error } = useSWR<Brand[]>(fetchBrandsQuery, fetcher);

  return { data, error: error?.message, isLoading: !data };
}

const ReadBrands = () => {
  const { data, error, isLoading } = useBrands();

  if (error) return <div>Failed to load brands: {error}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Brands</h1>
      <ul>
        {data?.map((brand: Brand) => (
          <li key={brand._id}>
            <h2>{brand.name}</h2>
            {brand.picture && (
              <Image
                src={brand.picture.asset.url}
                alt={brand.name}
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

export default ReadBrands;
