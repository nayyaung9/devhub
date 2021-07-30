import axios from "axios";
import useSWR from "swr";

function fetcher(url: string) {
  return fetch(url).then((r) => r.json());
}
export function useCurrentUser() {
  const { data, mutate } = useSWR("/api/auth/currentUser", fetcher);
  const user = data?.user;
  return [user, { mutate }];
}

// export function useUser(id) {
//   const { data } = useSWR(`/api/users/${id}`, fetcher, {
//     revalidateOnFocus: false,
//   });
//   return data?.user;
// }
