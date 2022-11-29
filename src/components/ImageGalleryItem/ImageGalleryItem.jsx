import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ src, alt, click, srcModal }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={() => click(srcModal, alt)}>
      <img className={css.ImageGalleryItemImage} src={src} alt={alt} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
  srcModal: PropTypes.string.isRequired,
};
