import { Rule } from "@sanity/types";

const admin = {
  name: "admin",
  type: "document",
  title: "Admin",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule: Rule) => Rule.required().min(2).max(50),
    },
    {
      name: "email",
      type: "string",
      title: "Email",
      validation: (Rule: Rule) => Rule.required().email(),
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

export default admin;
