import useSWR from "swr";

function fetcher(url: string) {
  return fetch(url).then((r) => r.json());
}

export function useBlogs() {
  const { data, error } = useSWR("/api/blog", fetcher);
  const blogs = data?.blogs;

  return {
    blogs,
    isLoading: !error && !data,
    isError: error,
  };
}

/**
 * This hook serves to fetch api that belongs to authenticated user.
 */
export function useMeBlogs() {
  const { data, error } = useSWR("/api/blog/me", fetcher);
  const blogs = data?.blogs;

  return {
    blogs,
    isLoading: !error && !data,
    isError: error,
  };
}

/**
 * Fetch blog detail by blog id
 */
export function useBlogDetail(id: string) {
  const { data, error } = useSWR(`/api/blog/${id}`, fetcher);
  const blog = data?.blog;

  return {
    blog,
    isLoading: !error && !data,
    isError: error,
  };
}
