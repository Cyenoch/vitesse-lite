export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  updatedAt: string;
}

export const posts: Post[] = [
  {
    id: "1",
    title: "Route params drive the cache",
    excerpt: "Use the current route param as part of the Pinia Colada query key.",
    content:
      "This example keeps the page thin. Vue Router owns navigation, the composable owns the query, and the API layer owns data access. Changing /posts/1 to /posts/2 changes the query key and fetches the next record without rewriting page logic.",
    tags: ["router", "cache", "template"],
    updatedAt: "2026-03-25",
  },
  {
    id: "2",
    title: "Keep the API layer replaceable",
    excerpt: "The page does not know whether data comes from mock data or a backend.",
    content:
      "The starter uses local mock data so it works offline and stays deterministic in CI. When you connect a real backend later, only the API file should need to change. The composable and route component should stay stable.",
    tags: ["api", "mock", "starter"],
    updatedAt: "2026-03-25",
  },
  {
    id: "3",
    title: "Make templates teach one pattern well",
    excerpt: "A starter should show one clear path instead of five half-finished examples.",
    content:
      "This template intentionally removes auth scaffolding, toast libraries, and query alternatives. It keeps one pattern for app setup and one pattern for async route data so new projects can extend it without first deleting a pile of unrelated code.",
    tags: ["design", "template", "cleanup"],
    updatedAt: "2026-03-25",
  },
];
