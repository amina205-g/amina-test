
export async function fetchSiteData() {
  try {
    const response = await fetch('public/data.json');
    if (!response.ok) {
      const fallback = await fetch('data.json');
      return await fallback.json();
    }
    return await response.json();
  } catch (error) {
    console.error("Error loading data", error);
    return null;
  }
}
