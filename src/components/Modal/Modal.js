import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ url, onClose }) => {
  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal}>
        <img className={css.image} src={url} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  url: PropTypes.string,
  onClose: PropTypes.func,
};

export default Modal;
