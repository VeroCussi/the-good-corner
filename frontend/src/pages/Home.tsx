import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_ADS, SEARCH_ADS } from '../operations';
import { Ad, SearchInput, PaginationInput } from '../types';
import { SearchForm } from '../components/SearchForm';
import './SearchForm.css';

export const Home: React.FC = () => {
  const [searchInput, setSearchInput] = useState<SearchInput>({});
  const [pagination, setPagination] = useState<PaginationInput>({
    skip: 0,
    take: 10,
    sortBy: 'createdAt',
    sortOrder: 'DESC'
  });

  const { loading, error, data } = useQuery(
    searchInput.query || searchInput.categoryId || searchInput.tagIds?.length || searchInput.minPrice || searchInput.maxPrice
      ? SEARCH_ADS
      : GET_ALL_ADS,
    {
      variables: {
        searchInput,
        pagination
      }
    }
  );

  const handleSearch = (newSearchInput: SearchInput) => {
    setSearchInput(newSearchInput);
    setPagination(prev => ({ ...prev, skip: 0 })); // Reset pagination on new search
  };

  const handleLoadMore = () => {
    setPagination(prev => ({
      ...prev,
      skip: (prev.skip || 0) + (prev.take || 10)
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const ads = data?.getAllAds || data?.searchAds || [];

  return (
    <div className="home-container">
      <SearchForm
        onSearch={handleSearch}
        categories={[]} // TODO: Add categories from your data
        tags={[]} // TODO: Add tags from your data
      />

      <div className="ads-grid">
        {ads.map((ad: Ad) => (
          <div key={ad.id} className="ad-card">
            <img src={ad.picture} alt={ad.title} className="ad-image" />
            <div className="ad-content">
              <h3>{ad.title}</h3>
              <p className="price">${ad.price}</p>
              <p className="location">{ad.location}</p>
              <div className="tags">
                {ad.tags.map(tag => (
                  <span key={tag.id} className="tag">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {ads.length > 0 && (
        <button onClick={handleLoadMore} className="load-more-btn">
          Load More
        </button>
      )}
    </div>
  );
}; 