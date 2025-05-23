import { useParams } from "react-router-dom";
import { AdCard } from "../components/AdCard";
import { useGetAdsByCategoryQuery } from "../../generated/graphql-types";

export const CategoryPage = () => {
  const { id } = useParams();
  
  const { data, loading, error } = useGetAdsByCategoryQuery({
    variables: { categoryId: id! },
    skip: !id
  });

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur lors du chargement des annonces</div>;

  const ads = data?.searchAds || [];
  const categoryTitle = ads.length > 0 ? ads[0].category?.title : `Catégorie ${id}`;

  return (
    <div className="category-page">
      <h2>Annonces de la catégorie "{categoryTitle}"</h2>
      <div className="ad-list">
        {ads.length === 0 && <p>Aucune annonce trouvée dans cette catégorie.</p>}
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
