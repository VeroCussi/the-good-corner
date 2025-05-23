import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCreateTagMutation } from "../../generated/graphql-types";

type TagFormData = {
  title: string;
};

export const NewTagForm = () => {
  const navigate = useNavigate();
  const [createTag] = useCreateTagMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TagFormData>();

  const onSubmit = async (data: TagFormData) => {
    try {
      await createTag({
        variables: {
          data: {
            title: data.title
          }
        }
      });
      toast.success("Tag créé avec succès !");
      reset();
      navigate("/");
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
        Nom du tag
        <input
          className="text-field"
          type="text"
          {...register("title", { required: "Le nom du tag est requis" })}
        />
        {errors.title && <p>{errors.title.message}</p>}
      </label>

      <button type="submit" className="button">Créer le tag</button>
    </div>
    </form>
  );
};
