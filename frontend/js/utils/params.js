export const getParams = params => {
  const URLSearchParams = new URL(window.location.href).searchParams;
  return URLSearchParams.get(params) || null;
}