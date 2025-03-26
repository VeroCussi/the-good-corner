import axios from "axios";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};

export const NewAdForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get<Category[]>("http://localhost:4000/categories");
        setCategories(result.data);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories :", error);
        alert("Erreur lors du chargement des catégories");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(" Données du formulaire :", formJson);

    try {
      const response = await axios.post("http://localhost:4000/ads", formJson);
      console.log("✅ Annonce envoyée :", response.data);
      alert("Annonce envoyée avec succès !");
      form.reset(); // reset del formulario
    } catch (error) {
      console.error(" Erreur lors de l'envoi :", error);
      alert("Erreur lors de l'envoi de l'annonce.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form">
        <label>
          Title
          <input className="text-field" type="text" name="title" required />
        </label>

        <label>
          Description
          <input className="text-field" type="text" name="description" required />
        </label>

        <label>
          Owner
          <input className="text-field" type="text" name="owner" required />
        </label>

        <label>
          Picture
          <input className="text-field" type="text" name="picture" />
        </label>

        <label>
          Location
          <input className="text-field" type="text" name="location" required />
        </label>

        <label>
          Price
          <input className="text-field" type="number" name="price" required />
        </label>

        <label>
          Category
          <select name="category" required>
            <option value="">-- Choisir une catégorie --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <button className="button" type="submit">Submit</button>
      </div>
    </form>
  );
};
