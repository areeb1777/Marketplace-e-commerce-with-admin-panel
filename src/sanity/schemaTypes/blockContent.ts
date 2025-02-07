const blockContentSchema = {
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
    },
  ],
};

export default blockContentSchema;
