export async function getData(endpoint) {
  const response = await fetch(`${endpoint}`);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const jsonData = await response.json();
  return jsonData;
}
