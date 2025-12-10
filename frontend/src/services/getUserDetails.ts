export function getUserDetails() {
  return fetch(`${import.meta.env.VITE_BACKEND_PATH}user`, {
    method: "GET",
    credentials: "include",
  });
}