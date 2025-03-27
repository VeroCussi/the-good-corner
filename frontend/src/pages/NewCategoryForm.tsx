import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

type CategoryFormData = {
  name: string;
  description: string;
};

export const NewCategoryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>();

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const res = await axios.post("http://localhost:4000/categories", data);
      toast.success("Catégorie créée avec succès !");
      console.log("Catégorie créée :", res.data);
      reset();
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
        Nom
        <input
          className="text-field"
          type="text"
          {...register("name", { required: "Le nom est requis" })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </label>

      <label>
        Description
        <input
          className="text-field"
          type="text"
          {...register("description", { required: "La description est requise" })}
        />
        {errors.description && <p>{errors.description.message}</p>}
      </label>

      <button type="submit" className="button">Créer la catégorie</button>
      </div>
    </form>
  );
};
