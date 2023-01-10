import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ handleClick }) => {
  return (
    <button type="button" className={css.button} onClick={handleClick}>
      Load more
    </button>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func,
};
export default Button;
