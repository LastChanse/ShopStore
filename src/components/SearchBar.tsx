import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce.ts';
import './SearchBar.css';

interface Props {
  onSearch: (term: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        placeholder="Поиск товаров..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <span className="search-bar__icon">🔍</span>
    </div>
  );
};

export default SearchBar;