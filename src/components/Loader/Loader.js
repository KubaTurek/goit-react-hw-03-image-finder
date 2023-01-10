import { Watch } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.overlay}>
      <Watch />
    </div>
  );
};

export default Loader;
