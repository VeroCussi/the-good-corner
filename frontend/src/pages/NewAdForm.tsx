/*********** *********************/
// EJEMPLO CON USE FORM
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { Category } from "../types";
import { Tags } from "../types";


type FormValues = {
  title: string;
  description: string;
  owner: string;
  picture: string;
  location: string;
  price: number;
  categoryId: string;
  tagsId: number[];
};

export const NewAdForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tags[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get<Category[]>("http://localhost:4000/categories");
        setCategories(result.data);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories :", error);
        toast.error("Erreur lors du chargement des catégories");
      }
    };

    const fetchTags = async () => {
      try {
        const result = await axios.get<Tags[]>("http://localhost:4000/tags");
        setTags(result.data);
      } catch (error) {
        console.error("Erreur lors du chargement des tags :", error);
        toast.error("Erreur lors du chargement des tags");
      }
    };

    fetchCategories();
    fetchTags();
  }, []);

  const onSubmit = async (data: FormValues) => {
    console.log(" Données du formulaire :", data);

    try {
      const response = await axios.post("http://localhost:4000/ads", data);
      console.log(" Annonce envoyée :", response.data);
      toast.success("Annonce envoyée avec succès !");
      reset();
    } catch (error) {
      console.error(" Erreur lors de l'envoi :", error);
      toast.error("Erreur lors de l'envoi de l'annonce.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form">
        <div>
          <h2>Add a new article</h2>
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
            {categories.map((categoryId) => (
              <option key={categoryId.id} value={categoryId.id}>
                {categoryId.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p>{errors.categoryId.message}</p>}
        </label>

        <label>
          Tags
          <div className="checkbox-group">
            {tags.map((tag) => (
              <label key={tag.id}>
                <input
                  type="checkbox"
                  value={tag.id}
                  {...register("tagsId")}
                />
                {tag.name}
              </label>
            ))}
          </div>
        </label>

        <button className="button" type="submit">Submit</button>
      </div>
    </form>
  );
};
