import { Rule } from "@sanity/types";

const productSchema = {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Product Name",
      type: "string",
      validation: (Rule: Rule) =>
        Rule.required().error("Product name is required"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: Rule) =>
        Rule.required().error("Slug is required"),
    },
    {
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      validation: (Rule: Rule) =>
        Rule.required().error("Short description is required"),
    },
    {
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }],
      validation: (Rule: Rule) => Rule.required().error("Brand is required"),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule: Rule) => Rule.required().error("Category is required"),
    },
    {
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule: Rule) => Rule.required().error("Stock is required"),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule: Rule) => Rule.required().error("Price is required"),
    },
    {
      name: "salePrice",
      title: "Sale Price",
      type: "number",
      validation: (Rule: Rule) =>
        Rule.required().error("Sale price is required"),
    },
    {
      name: "width",
      title: "Width",
      type: "number",
      validation: (Rule: Rule) => Rule.required().error("Width is required"),
    },
    {
      name: "height",
      title: "Height",
      type: "number",
      validation: (Rule: Rule) => Rule.required().error("Height is required"),
    },
    {
      name: "depth",
      title: "Depth",
      type: "number",
      validation: (Rule: Rule) => Rule.required().error("Depth is required"),
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      validation: (Rule: Rule) =>
        Rule.required().error("Features are required"),
    },
    {
      name: "featureImage",
      title: "Feature Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "additionalImages",
      title: "Additional Images",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent",
      validation: (Rule: Rule) =>
        Rule.required().error("Description is required"),
    },
    {
      name: "orders",
      title: "Orders",
      type: "number",
    },
  ],
};

export default productSchema;
