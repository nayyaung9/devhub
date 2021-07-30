import useSWR from "swr";

function fetcher(url: string) {
  return fetch(url).then((r) => r.json());
}

export function useProjects() {
  const { data, error } = useSWR("/api/project", fetcher);
  const projects = data?.projects;

  return {
    projects,
    isLoading: !error && !data,
    isError: error,
  };
}

// export function useUser(id) {
//   const { data } = useSWR(`/api/users/${id}`, fetcher, {
//     revalidateOnFocus: false,
//   });
//   return data?.user;
// }
