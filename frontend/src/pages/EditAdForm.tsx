import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { 
  useGetAllCategoriesQuery, 
  useGetAllTagsQuery, 
  useGetAdQuery,
  useCreateAdMutation,
  useUpdateAdMutation 
} from "../../generated/graphql-types";

type FormValues = {
  title: string;
  description: string;
  owner: string;
  picture: string;
  location: string;
  price: number;
  category: string;
  tags: number[];
};

export const EditAdForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  // GraphQL queries
  const { data: categoriesData, loading: categoriesLoading } = useGetAllCategoriesQuery();
  const { data: tagsData, loading: tagsLoading } = useGetAllTagsQuery();
  const { data: adData, loading: adLoading } = useGetAdQuery({
    variables: { id: parseFloat(id!) },
    skip: !isEditing
  });

  // GraphQL mutations
  const [createAd] = useCreateAdMutation();
  const [updateAd] = useUpdateAdMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  // Load ad data when editing
  useEffect(() => {
    if (isEditing && adData?.getAd) {
      const ad = adData.getAd;
      reset({
        title: ad.title,
        description: ad.description,
        owner: ad.owner,
        picture: ad.picture,
        location: ad.location,
        price: ad.price,
        category: ad.category?.id.toString() || "",
        tags: ad.tags?.map((tag) => tag.id) || [],
      });
    }
  }, [adData, isEditing, reset]);

  const onSubmit = async (data: FormValues) => {
    console.log("Données du formulaire :", data);
  
    try {
      const adInput = {
        title: data.title,
        description: data.description,
        owner: data.owner,
        picture: data.picture,
        location: data.location,
        price: data.price,
        category: data.category,
        tags: data.tags.map(tagId => tagId.toString())
      };

      if (isEditing) {
        // Mode édition
        await updateAd({
          variables: { 
            id: parseFloat(id!), 
            data: adInput 
          }
        });
        toast.success("Annonce modifiée avec succès !");
      } else {
        // Mode création
        await createAd({
          variables: { data: adInput }
        });
        toast.success("Annonce envoyée avec succès !");
      }

      reset();
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      toast.error("Erreur lors de l'envoi de l'annonce.");
    }
  };

  if (categoriesLoading || tagsLoading || (isEditing && adLoading)) {
    return <p>Chargement...</p>;
  }

  const categories = categoriesData?.getAllCategories || [];
  const tags = tagsData?.getAllTags || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form">
        <div>
          <h2>{isEditing ? 'Modifier l\'annonce' : 'Ajouter une nouvelle annonce'}</h2>
        </div>

        <label>
          Title
          <input
            className="text-field"
            type="text"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </label>

        <label>
          Description
          <input
            className="text-field"
            type="text"
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </label>

        <label>
          Owner
          <input
            className="text-field"
            type="text"
            {...register("owner", { required: "Owner is required" })}
          />
          {errors.owner && <p>{errors.owner.message}</p>}
        </label>

        <label>
          Picture
          <input
            className="text-field"
            type="text"
            {...register("picture")}
          />
        </label>

        <label>
          Location
          <input
            className="text-field"
            type="text"
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && <p>{errors.location.message}</p>}
        </label>

        <label>
          Price
          <input
            className="text-field"
            type="number"
            {...register("price", { required: "Price is required", valueAsNumber: true })}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </label>

        <label>
          Category
          <select {...register("category", { required: "Category is required" })}>
            <option value="">-- Choisir une catégorie --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </label>

        <label>
          Tags
          <div className="checkbox-group">
            {tags.map((tag) => (
              <label key={tag.id}>
                <input
                  type="checkbox"
                  value={tag.id}
                  {...register("tags")}
                />
                {tag.title}
              </label>
            ))}
          </div>
        </label>

        <button className="button" type="submit">
          {isEditing ? 'Modifier' : 'Créer'}
        </button>
      </div>
    </form>
  );
};


