import { Rule } from "@sanity/types";

const brand = {
  name: "brand",
  type: "document",
  title: "Brand",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule: Rule) => Rule.required().min(2).max(50),
    },
    {
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
};

export default brand;
