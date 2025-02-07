const categorySchema = {
  name: 'category',
  type: 'document',
  title: 'Category',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'picture',
      type: 'image',
      title: 'Picture'
    }
  ]
};

export default categorySchema;
