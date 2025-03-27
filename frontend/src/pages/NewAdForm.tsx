// import axios from "axios";
// import { useEffect, useState } from "react";

// type Category = {
//   id: number;
//   name: string;
// };

// export const NewAdForm = () => {
//   const [categories, setCategories] = useState<Category[]>([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const result = await axios.get<Category[]>("http://localhost:4000/categories");
//         setCategories(result.data);
//       } catch (error) {
//         console.error("Erreur lors du chargement des catégories :", error);
//         alert("Erreur lors du chargement des catégories");
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const form = e.currentTarget;
//     const formData = new FormData(form);
//     const formJson = Object.fromEntries(formData.entries());
//     console.log(" Données du formulaire :", formJson);

//     try {
//       const response = await axios.post("http://localhost:4000/ads", formJson);
//       console.log(" Annonce envoyée :", response.data);
//       alert("Annonce envoyée avec succès !");
//       form.reset(); // reset del formulario
//     } catch (error) {
//       console.error(" Erreur lors de l'envoi :", error);
//       alert("Erreur lors de l'envoi de l'annonce.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="form">
//         <div><h2>Add a new article</h2></div>
//         <label>
//           Title
//           <input className="text-field" type="text" name="title" required />
//         </label>

//         <label>
//           Description
//           <input className="text-field" type="text" name="description" required />
//         </label>

//         <label>
//           Owner
//           <input className="text-field" type="text" name="owner" required />
//         </label>

//         <label>
//           Picture
//           <input className="text-field" type="text" name="picture" />
//         </label>

//         <label>
//           Location
//           <input className="text-field" type="text" name="location" required />
//         </label>

//         <label>
//           Price
//           <input className="text-field" type="number" name="price" required />
//         </label>

//         <label>
//           Category
//           <select name="category" required>
//             <option value="">-- Choisir une catégorie --</option>
//             {categories.map((category) => (
//               <option key={category.id} value={category.id}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//         </label>

//         <button className="button" type="submit">Submit</button>
//       </div>
//     </form>
//   );
// };

/*********** *********************/
// EJEMPLO CON USE FORM
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { Category } from "../types";


type FormValues = {
  title: string;
  description: string;
  owner: string;
  picture: string;
  location: string;
  price: number;
  categoryId: string;
};

export const NewAdForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);

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

    fetchCategories();
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

        <button className="button" type="submit">Submit</button>
      </div>
    </form>
  );
};
