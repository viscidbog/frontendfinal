// fetch training data
export const fetchTrainings = () => {
  return fetch(import.meta.env.VITE_GETTRAININGS_URL).then((response) => {
    if (!response.ok) throw new Error("Error in fetch: " + response.statusText);

    return response.json();
  });
};
