import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export async function getAllPosts() {
  return (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

export async function getPostsByCategory(category: string) {
  const posts = await getAllPosts();
  return posts.filter(post => 
    post.data.category.toLowerCase() === category.toLowerCase()
  );
}

export async function getPostsByTag(tag: string) {
  const posts = await getAllPosts();
  return posts.filter(post => 
    post.data.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllCategories(posts: CollectionEntry<'blog'>[]) {
  return [...new Set(posts.map(post => post.data.category))];
}

export function getAllTags(posts: CollectionEntry<'blog'>[]) {
  return [...new Set(posts.flatMap(post => post.data.tags))];
}

export function getPaginatedPosts(
  posts: CollectionEntry<'blog'>[],
  page: number,
  postsPerPage: number
) {
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  return {
    posts: posts.slice(start, end),
    totalPages: Math.ceil(posts.length / postsPerPage),
  };
}