import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.search__bar}>
      <form className={css.search__form} onSubmit={onSubmit}>
        <button type="submit" className={css.search__button}>
          <span className={css.search__label}>Find</span>
        </button>

        <input
          className={css.search__input}
          type="text"
          autoComplete="off"
          autoFocus
          name="input"
          placeholder="Search images"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
