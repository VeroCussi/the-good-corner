import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Ad } from "../types";

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
          <div key={ad.id} className="ad-card">
            <img src={ad.picture} alt={ad.title} />
            <h3>{ad.title}</h3>
            <p>{ad.price} €</p>
          </div>
        ))}
      </div>
    </div>
  );
};
