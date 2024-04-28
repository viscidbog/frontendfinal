// eslint-disable-next-line no-unused-vars
export const fetchCustomers = () => {
  return fetch(import.meta.env.VITE_CUSTOMER_URL).then((response) => {
    if (!response.ok) throw new Error("Error in fetch: " + response.statusText);

    return response.json();
  });
};
