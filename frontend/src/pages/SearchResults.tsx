import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AdCard } from "../components/AdCard";
import { AdCardProps } from "../types";

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState<AdCardProps[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
        if (!query) return;

      try {
        const response = await axios.get(`http://localhost:4000/ads/search?query=${query}`);
        setResults(response.data);
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="search-results">
      <h2>Résultats pour : "{query}"</h2>
      {results.length === 0 ? (
        <p>Aucune annonce trouvée.</p>
      ) : (
        // <ul>
        //   {results.map((ad: any) => (
        //     <li key={ad.id}>{ad.title} – {ad.price} €</li>
        //   ))}
        // </ul>
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
