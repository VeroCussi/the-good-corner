import React, { useState } from 'react';
import { SearchInput } from '../types';

interface SearchFormProps {
  onSearch: (searchInput: SearchInput) => void;
  categories: { id: number; name: string }[];
  tags: { id: number; name: string }[];
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, categories, tags }) => {
  const [searchInput, setSearchInput] = useState<SearchInput>({
    query: '',
    categoryId: undefined,
    tagIds: [],
    minPrice: undefined,
    maxPrice: undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const handleTagChange = (tagId: number) => {
    setSearchInput(prev => ({
      ...prev,
      tagIds: prev.tagIds?.includes(tagId)
        ? prev.tagIds.filter(id => id !== tagId)
        : [...(prev.tagIds || []), tagId]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Search ads..."
          value={searchInput.query}
          onChange={(e) => setSearchInput(prev => ({ ...prev, query: e.target.value }))}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <select
          value={searchInput.categoryId || ''}
          onChange={(e) => setSearchInput(prev => ({ 
            ...prev, 
            categoryId: e.target.value ? Number(e.target.value) : undefined 
          }))}
          className="form-control"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <div className="price-range">
          <input
            type="number"
            placeholder="Min Price"
            value={searchInput.minPrice || ''}
            onChange={(e) => setSearchInput(prev => ({ 
              ...prev, 
              minPrice: e.target.value ? Number(e.target.value) : undefined 
            }))}
            className="form-control"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={searchInput.maxPrice || ''}
            onChange={(e) => setSearchInput(prev => ({ 
              ...prev, 
              maxPrice: e.target.value ? Number(e.target.value) : undefined 
            }))}
            className="form-control"
          />
        </div>
      </div>

      <div className="form-group">
        <div className="tags-container">
          {tags.map(tag => (
            <label key={tag.id} className="tag-checkbox">
              <input
                type="checkbox"
                checked={searchInput.tagIds?.includes(tag.id)}
                onChange={() => handleTagChange(tag.id)}
              />
              {tag.name}
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
}; 