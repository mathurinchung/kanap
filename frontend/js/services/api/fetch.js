const baseUrl = 'http://localhost:3000/api';

const jsonOrThrowIfError = async response => {
  if(!response.ok) throw new Error((await response.json()).message);
  return response.json();
};

export const fetchData = async ({ endpoint, init }) => jsonOrThrowIfError(await fetch(`${baseUrl + endpoint}`, init));
