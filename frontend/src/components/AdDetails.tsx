import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

type Ad = {
  id: number;
  title: string;
  description: string;
  price: number;
  picture: string;
  location: string;
  owner: string;
  category?: { name: string };
  tags?: { name: string };
};

export const AdDetails = () => {
  const { id } = useParams();
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/ads/${id}`);
        setAd(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement de l'annonce :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);

  if (loading) return <p>Chargement de l'annonce...</p>;
  if (!ad) return <p>Annonce introuvable.</p>;

  return (
    <div className="main-content">
      <h2 className="ad-details-title">{ad.title}</h2>
      <section className="ad-details">
        <div className="ad-details-image-container">
          <img className="ad-details-image" src={ad.picture} alt={ad.title}  />
        </div>
        <div className="ad-details-info">
          <p className="ad-details-price"><strong>Prix :</strong> {ad.price} €</p>
          <p className="ad-details-description"><strong>Description :</strong> {ad.description}</p>
          
          <hr className="separator" />
          
          <p className="ad-details-owner"><strong>Propriétaire :</strong> {ad.owner}</p>
          <a
            href={ad.owner}
            className="button button-primary link-button"
            ><svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
              stroke= "currentcolor"
              stroke-width= "2.5"
              fill= "none"
            >
              <path
                d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"
              ></path>
            </svg>
            Envoyer un email</a
          >
          <p><strong>Lieu :</strong> {ad.location}</p>
          </div>
        
          {ad.category && <p><strong>Catégorie :</strong> {ad.category.name}</p>}
          {ad.tags && <p><strong>Tag :</strong> {ad.tags.name}</p>}
          
      </section>
    </div>
  );
};
