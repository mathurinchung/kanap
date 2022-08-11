/**
 * 
 * @param { String } params 
 * @returns 
 */
export function getParams(params) {
  const URLSearchParams = new URL(window.location.href).searchParams;
  return URLSearchParams.get(params) || null;
}
