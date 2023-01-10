import css from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ data, handleDelete }) => {
  return (
    <div className={css.contacts}>
      <ul className={css.list}>
        {data.map(contact => {
          return (
            <li className={css.li} id={contact.id} key={contact.id}>
              <div>
                <span className={css.name}>{contact.name}</span>
                <span className={css.number}>{contact.number}</span>
              </div>

              <button
                type="button"
                className={css.delete}
                onClick={() => handleDelete(contact.id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  handleDelete: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
