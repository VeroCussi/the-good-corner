import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Ad } from "../types";
import { AdCard } from "../components/AdCard";

export const CategoryPage = () => {
  const { id } = useParams();
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    const fetchAdsByCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/ads`);
        const filtered = res.data.filter((ad: any) => ad.categoryId === parseInt(id!));
        setAds(filtered);
      } catch (error) {
        console.error("Erreur lors du chargement des annonces");
      }
    };

    fetchAdsByCategory();
  }, [id]);

  return (
    <div className="category-page">
      <h2>Annonces de la catégorie {id}</h2>
      <div className="ad-list">
        {ads.length === 0 && <p>Aucune annonce trouvée.</p>}
        {ads.map(ad => (
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
    </div>
  );
};
