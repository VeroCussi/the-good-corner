import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCreateCategoryMutation } from "../../generated/graphql-types";

type CategoryFormData = {
  title: string;
};

export const NewCategoryForm = () => {
  const navigate = useNavigate();
  const [createCategory] = useCreateCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>();

  const onSubmit = async (data: CategoryFormData) => {
    try {
      await createCategory({
        variables: {
          data: {
            title: data.title
          }
        }
      });
      toast.success("Catégorie créée avec succès !");
      reset();
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la création :", error);
      toast.error("Erreur lors de la création de la catégorie");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
        <div className="form">
      <h2>Créer une nouvelle catégorie</h2>

      <label>
        Nom de la catégorie
        <input
          className="text-field"
          type="text"
          {...register("title", { required: "Le nom de la catégorie est requis" })}
        />
        {errors.title && <p>{errors.title.message}</p>}
      </label>

      <button type="submit" className="button">Créer la catégorie</button>
      </div>
    </form>
  );
};
