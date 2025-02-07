import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, token } from '../../env';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

export const fetcher = async (query: string) => {
  return await client.fetch(query);
};
