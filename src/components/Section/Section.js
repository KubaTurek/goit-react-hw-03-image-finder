import css from './Section.module.css';
import PropTypes from 'prop-types';

const Section = ({ tittle, children }) => {
  return (
    <div className={css.section}>
      <h1 className={css.tittle}>{tittle}</h1>
      {children}
    </div>
  );
};

Section.propTypes = {
  tittle: PropTypes.string,
  children: PropTypes.node,
};

export default Section;
