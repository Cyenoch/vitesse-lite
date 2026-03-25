import { useQuery } from "@pinia/colada";
import { computed, toValue } from "vue";
import type { MaybeRefOrGetter } from "vue";
import { getPostById } from "@/api/posts";

export function usePostQuery(postId: MaybeRefOrGetter<string | string[] | undefined>) {
  const normalizedPostId = computed(() => {
    const value = toValue(postId);
    return Array.isArray(value) ? value[0] : value;
  });

  return useQuery({
    key: () => ["posts", `${normalizedPostId.value}`],
    enabled: () => Boolean(normalizedPostId.value),
    query: () => getPostById(normalizedPostId.value!),
  });
}
