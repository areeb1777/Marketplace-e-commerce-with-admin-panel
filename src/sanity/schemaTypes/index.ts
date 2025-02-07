import { type SchemaTypeDefinition } from 'sanity';
import category from './category';
import brand from './brand';
import admin from './admin';
import product from './product';
import blockContent from './blockContent';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, brand, admin, product, blockContent],
};
