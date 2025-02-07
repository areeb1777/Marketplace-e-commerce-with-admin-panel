"use client";

import useSWR from 'swr';
import Image from 'next/image';
import { fetcher } from '../../../src/sanity/lib/utils/fetcher';

interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  picture?: { asset: { _id: string; url: string } };
}

export function useCategories() {
  const fetchCategoriesQuery = `*[_type == "category"]{_id, name, slug, picture{asset->{_id, url}}}`;
  const { data, error } = useSWR<Category[]>(fetchCategoriesQuery, fetcher);

  return { data, error: error?.message, isLoading: !data };
}

const ReadCategories = () => {
  const { data, error, isLoading } = useCategories();

  if (error) return <div>Failed to load categories: {error}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {data?.map((category: Category) => (
          <li key={category._id}>
            <h2>{category.name}</h2>
            {category.picture && (
              <Image
                src={category.picture.asset.url}
                alt={category.name}
                width={200}
                height={200}
                className="rounded-lg"
              />
            )}
            <p>Slug: {category.slug.current}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadCategories;
