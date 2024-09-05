export async function getData(endpoint) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${baseUrl}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const jsonData = await response.json();
  return jsonData;
}
