import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

type TagFormData = {
  name: string;
  description: string;
};

export const NewTagForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TagFormData>();

  const onSubmit = async (data: TagFormData) => {
    try {
      const res = await axios.post("http://localhost:4000/tags", data);
      toast.success("Tag créé avec succès !");
      console.log("Tag créé :", res.data);
      reset();
    } catch (error) {
      console.error("Erreur lors de la création du tag :", error);
      toast.error("Erreur lors de la création du tag");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="form">
      <h2>Créer un nouveau tag</h2>

      <label>
        Nom
        <input
          className="text-field"
          type="text"
          {...register("name", { required: "Le nom du tag est requis" })}
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

      <button type="submit" className="button">Créer le tag</button>
    </div>
    </form>
  );
};
