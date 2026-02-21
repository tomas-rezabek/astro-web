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

const wordpress = defineCollection({
  loader: async () => {
    const response = await fetch("https://wp.t4c.cz/wp-json/wp/v2/posts?_embed");
    const prispevky = await response.json();

    return prispevky.map((prispevek: any) => ({
      id: String(prispevek.id),
      slug: String(prispevek.slug),
      author: String(prispevek._embedded.author[0].name),
      title: String(prispevek.title?.rendered ?? ""),
      content: String(prispevek.content?.rendered)
    }));
  },
  schema: z.object({
    title: z.string(),
    author: z.string(),
    slug: z.string(),
    content: z.string()
  })
});

export const collections = { blog, wordpress };