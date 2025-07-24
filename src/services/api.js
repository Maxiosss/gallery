const API_KEY = "48169121-62c88a9413be0b8e9ebea883d";
const PER_PAGE = 12;
const BASE_URL = "https://pixabay.com/api/";
const fetchImages = async (query, page = 1) => {
  const response = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(
      query
    )}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }
  const data = await response.json();
  return data.hits;
};
export default fetchImages;
