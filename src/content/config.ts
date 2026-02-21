import { defineCollection } from "astro:content";

import { glob, file } from 'astro/loaders';

import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/pages/blog"}),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    updatedDate: z.coerce.date().optional(),
  })
});

export const collections = { blog };