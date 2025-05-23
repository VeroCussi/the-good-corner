/*********** *********************/
// EJEMPLO CON USE FORM
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useGetAllCategoriesQuery, useGetAllTagsQuery, useGetAdQuery, useCreateAdMutation, useUpdateAdMutation } from "../../generated/graphql-types";

type FormValues = {
  title: string;
  description: string;
  owner: string;
  picture: string;
  location: string;
  price: number;
  categoryId: string;
  tagsId: string | string[] | undefined;
};

export const NewAdForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  // GraphQL queries and mutations
  const { data: categoriesData, loading: categoriesLoading } = useGetAllCategoriesQuery();
  const { data: tagsData, loading: tagsLoading } = useGetAllTagsQuery();
  const { data: adData, loading: adLoading } = useGetAdQuery({
    variables: { id: parseFloat(id || "0") },
    skip: !isEditing
  });
  
  const [createAd] = useCreateAdMutation();
  const [updateAd] = useUpdateAdMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (isEditing && adData?.getAd) {
      const ad = adData.getAd;
      const tagsIds = ad.tags?.map((tag) => tag.id.toString()) || [];
      
      reset({
        title: ad.title,
        description: ad.description,
        owner: ad.owner,
        picture: ad.picture,
        location: ad.location,
        price: ad.price,
        categoryId: ad.category?.id.toString(),
        tagsId: tagsIds,
      });
    }
  }, [adData, reset, isEditing]);

  const onSubmit = async (data: FormValues) => {
    console.log("Données du formulaire :", data);
    console.log("Type de tagsId:", typeof data.tagsId, "Valor:", data.tagsId);
  
    try {
      // Validación básica
      if (!data.categoryId) {
        toast.error("Veuillez sélectionner une catégorie");
        return;
      }

      // Asegurar que tagsId sea siempre un array
      const tagsArray = data.tagsId ? (Array.isArray(data.tagsId) ? data.tagsId : [data.tagsId]) : [];
      console.log("tagsArray después de normalizar:", tagsArray);
      
      const adInput = {
        title: data.title,
        description: data.description,
        owner: data.owner,
        picture: data.picture,
        location: data.location,
        price: data.price,
        category: data.categoryId,
        tags: tagsArray.map(tagId => tagId.toString())
      };

      console.log("adInput final:", adInput);

      if (isEditing) {
        // Modo edición 
        await updateAd({
          variables: {
            id: parseFloat(id!),
            data: adInput
          }
        });
        toast.success("Annonce modifiée avec succès !");
      } else {
        // Modo creación
        await createAd({
          variables: {
            data: adInput
          }
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
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form">
        <div>
          <h2>{isEditing ? "Modifier l'annonce" : "Add a new article"}</h2>
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
          <select {...register("categoryId", { required: "Category is required" })}>
            <option value="">-- Choisir une catégorie --</option>
            {categoriesData?.getAllCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          {errors.categoryId && <p>{errors.categoryId.message}</p>}
        </label>

        <label>
          Tags
          <div className="checkbox-group">
            {tagsData?.getAllTags.map((tag) => (
              <label key={tag.id}>
                <input
                  type="checkbox"
                  value={tag.id}
                  {...register("tagsId")}
                />
                {tag.title}
              </label>
            ))}
          </div>
        </label>

        <button className="button" type="submit">
          {isEditing ? "Modifier" : "Submit"}
        </button>
      </div>
    </form>
  );
};
