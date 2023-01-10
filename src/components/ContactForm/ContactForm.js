import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

const ContactForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label>
        <p className={css.label}>Name</p>
        <input
          type="text"
          name="name"
          id="name"
          className={css.input}
          placeholder="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        <p className={css.label}>Number</p>
        <input
          type="tel"
          name="number"
          id="number"
          className={css.input}
          placeholder="phone number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit" className={css.button}>
        Add Contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default ContactForm;
