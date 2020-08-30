import React from 'react';
import PropTypes from 'prop-types';
// import './ImageGalleryItem.css';

export default function ImageGalleryItem({
  id,
  webformatURL,
  largeImageURL,
  tags,
  onClick,
}) {
  return (
    <li
      id={id}
      className="ImageGalleryItem"
      onClick={() => onClick(largeImageURL)}
    >
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
