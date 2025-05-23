import { useSearchParams } from "react-router-dom";
import { AdCard } from "../components/AdCard";
import { useSearchAdsQuery } from "../../generated/graphql-types";

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  
  const { data, loading, error } = useSearchAdsQuery({
    variables: { 
      searchInput: { query }
    },
    skip: !query
  });

  if (loading) return <p>Recherche en cours...</p>;
  if (error) return <p>Erreur lors de la recherche : {error.message}</p>;

  const results = data?.searchAds || [];

  return (
    <div className="search-results">
      <h2>Résultats pour : "{query}"</h2>
      {results.length === 0 ? (
        <p>Aucune annonce trouvée.</p>
      ) : (
        <div className="ad-list">
        {results.map((ad) => (
            <AdCard
            key={ad.id}
            id={ad.id}
            title={ad.title}
            picture={ad.picture}
            price={ad.price}
            link={`/ad/${ad.id}`}
            />
        ))}
        </div>
      )}
    </div>
  );
};
