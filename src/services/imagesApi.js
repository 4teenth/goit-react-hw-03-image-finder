import axios from 'axios';

const API_KEY = '18089918-e9040aca5726c1bb4261da717';
const URL = 'https://pixabay.com/api/';

const fetchImagesWithQuery = (searchQuery, page = 1) => {
  return axios
    .get(
      `${URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);
};

export default {
  fetchImagesWithQuery,
};
