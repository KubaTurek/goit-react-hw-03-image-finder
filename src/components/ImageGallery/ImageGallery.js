import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ children }) => {
  return <ul className={css.gallery}>{children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.node,
};

export default ImageGallery;
