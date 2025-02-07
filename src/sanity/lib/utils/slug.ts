export interface Slug {
    _type: 'slug';
    current: string;
  }
  
  export const createSlug = (name: string): Slug => {
    return {
      _type: 'slug',
      current: name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    };
  };
  