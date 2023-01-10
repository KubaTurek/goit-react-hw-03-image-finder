import css from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ filterOnChange }) => {
  return (
    <div className={css.filter}>
      <label>
        Find contacts by name
        <input
          className={css.input}
          type="search"
          placeholder="search contact"
          onChange={filterOnChange}
        ></input>
      </label>
    </div>
  );
};

Filter.propTypes = {
  filterOnChange: PropTypes.func,
};

export default Filter;
