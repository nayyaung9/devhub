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
