import axios from 'axios';

export async function getImage(q, page) {
  const get = await axios.get(
    `https://pixabay.com/api/?q=${q}&page=${page}&key=30745008-d5532b40a5a7d9416df3fd4b0&image_type=photo&orientation=horizontal&per_page=12`
  );
  return get.data;
}
