import { GetServerSideProps } from 'next';
import { createClient } from 'next-sanity';
import React from 'react';
import Image from 'next/image';
import { apiVersion, dataset, projectId, token } from '../../../src/sanity/env';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await client.fetch(`*[_type == "category"]{_id, name, slug, picture{asset->{_id, url}}}`);
  return {
    props: {
      categories: data,
    },
  };
};

interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  picture?: { asset: { _id: string; url: string } };
}

const ReadServer = ({ categories }: { categories: Category[] }) => {
  if (!categories.length) {
    return <div>No categories found.</div>;
  }

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
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

export default ReadServer;
