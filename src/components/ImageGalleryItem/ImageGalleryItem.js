import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ images, handleClick }) => {
  return images.map(image => {
    return (
      <li className={css.gallery__item} key={image.id}>
        <img
          src={image.webformatURL}
          alt={image.tags}
          data-large={image.largeImageURL}
          className={css.gallery__image}
          onClick={() => handleClick(image.largeImageURL)}
        />
      </li>
    );
  });
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ),
  handleClick: PropTypes.func,
};

export default ImageGalleryItem;
