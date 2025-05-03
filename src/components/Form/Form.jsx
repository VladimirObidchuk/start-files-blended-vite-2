import { FiSearch } from 'react-icons/fi';
import style from './Form.module.css';
import { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmint = e => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <form className={style.form} onSubmit={handleSubmint}>
      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>

      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        required
        autoFocus
        value={query}
        onChange={handleChange}
      />
    </form>
  );
};

export default Form;
