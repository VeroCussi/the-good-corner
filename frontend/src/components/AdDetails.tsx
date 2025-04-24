import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type Ad = {
  id: number;
  title: string;
  description: string;
  price: number;
  picture: string;
  location: string;
  owner: string;
  category?: { name: string };
  tags: { id: number; name: string }[];
};

export const AdDetails = () => {
  const { id } = useParams();
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  // version con toast
  const handleDelete = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Es-tu sûre de vouloir supprimer cette annonce ?</p>
          <button
            onClick={async () => {
              try {
                await axios.delete(`http://localhost:4000/ads/${id}`);
                toast.success("Annonce supprimée avec succès !");
                navigate("/");
                closeToast();
              } catch (error) {
                console.error("Erreur lors de la suppression :", error);
                toast.error("Erreur lors de la suppression de l'annonce.");
                closeToast();
              }
            }}
            style={{ marginRight: "10px" }}
          >
            Oui
          </button>
          <button onClick={closeToast}>Non</button>
        </div>
      ),
      { autoClose: false }
    );
  };

  return (
    <div className="main-content">
      <h2 className="ad-details-title">{ad.title}</h2>
      <section className="ad-details">
        <div className="ad-details-image-container">
          <img className="ad-details-image" src={ad.picture} alt={ad.title}  />
        </div>
        <div className="ad-details-info">
          <p className="ad-details-owner"><strong>Propriétaire :</strong> {ad.owner}</p>
          <p className="ad-details-description"><strong>Description :</strong> {ad.description}</p>
          <p className="ad-details-price"><strong>Prix :</strong> {ad.price} €</p>
          <p><strong>Lieu :</strong> {ad.location}</p>

          <hr className="separator" />
       
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
              strokeWidth= "2.5"
              fill= "none"
            >
              <path
                d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"
              ></path>
            </svg>
            Envoyer un email</a
          >
        
          
          </div>
        
          {ad.category && <p><strong>Catégorie :</strong> {ad.category.name}</p>}
          {ad.tags && ad.tags.length > 0 && (
            <p>
              <strong>Tags :</strong> {ad.tags.map(tag => tag.name).join(", ")}
            </p>
          )}
        
          <button className="button button-danger" onClick={handleDelete}>
            Supprimer l'annonce
          </button>

          <Link to={`/ad/edit/${ad.id}`} className="button">
            Modifier l'annonce
          </Link>
        
      </section>
    </div>
  );
};
