import type { Post } from "@/data/posts";
import { posts } from "@/data/posts";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getPostById(id: string): Promise<Post> {
  await sleep(180);

  const post = posts.find((entry) => entry.id === id);

  if (!post) {
    throw new Error(`Post "${id}" was not found.`);
  }

  return post;
}
