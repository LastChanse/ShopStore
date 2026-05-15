import './FilterPanel.css';

interface Props {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onSortChange: (sort: string) => void;
}

const FilterPanel = ({ categories, activeCategory, onCategoryChange, onSortChange }: Props) => {
  const categoryLabels: Record<string, string> = {
    '': 'Все товары',
    women: 'Женщины',
    men: 'Мужчины',
    kids: 'Дети',
  };

  const allCategories = ['', ...categories];

  return (
    <div className="filter-panel">
      <div className="filter-panel__categories">
        {allCategories.map(cat => (
          <button
            key={cat}
            className={`filter-panel__category-btn ${activeCategory === cat ? 'filter-panel__category-btn--active' : ''}`}
            onClick={() => onCategoryChange(cat)}
          >
            {categoryLabels[cat] || cat}
          </button>
        ))}
      </div>
      <select onChange={(e) => onSortChange(e.target.value)} className="filter-panel__select">
        <option value="default">По умолчанию</option>
        <option value="price-asc">Цена: по возрастанию</option>
        <option value="price-desc">Цена: по убыванию</option>
        <option value="rating">По рейтингу</option>
        <option value="name">По названию</option>
      </select>
    </div>
  );
};

export default FilterPanel;