import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useGetAdQuery, useDeleteAdMutation } from "../../generated/graphql-types";
import 'react-toastify/dist/ReactToastify.css';

export const AdDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data, loading, error } = useGetAdQuery({
    variables: { id: parseFloat(id!) },
    skip: !id
  });
  
  const [deleteAd] = useDeleteAdMutation();

  if (loading) return <p>Chargement de l'annonce...</p>;
  if (error) return <p>Erreur lors du chargement de l'annonce.</p>;
  if (!data?.getAd) return <p>Annonce introuvable.</p>;

  const ad = data.getAd;

  // version con toast
  const handleDelete = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Es-tu sûre de vouloir supprimer cette annonce ?</p>
          <button
            onClick={async () => {
              try {
                await deleteAd({
                  variables: { id: parseFloat(id!) }
                });
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
            href={`mailto:${ad.owner}`}
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
        
          {ad.category && <p><strong>Catégorie :</strong> {ad.category.title}</p>}
          {ad.tags && ad.tags.length > 0 && (
            <p>
              <strong>Tags :</strong> {ad.tags.map(tag => tag.title).join(", ")}
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
