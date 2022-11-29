import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

const onSubmit = (e, onSearch) => {
  e.preventDefault();
  onSearch(e.target.elements.search.value);
};

export const Searchbar = ({ onSearch, search, onChange }) => {
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={e => onSubmit(e, onSearch)}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          value={search}
          onChange={e => {
            onChange(e.target.value);
          }}
          className={css.SearchFormInput}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
