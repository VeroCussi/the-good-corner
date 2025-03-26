import express from "express";
//import sqlite3 from 'sqlite3';
import "reflect-metadata";
import dataSource from "./config/db";
import { Ad } from "./entities/Ad";
import { Category } from "./entities/Category";
import { Tags } from "./entities/Tags";
import cors from "cors";

const app = express();
const port = 4000;

//const db = new sqlite3.Database('good_corner.sqlite');

// Middleware
app.use(cors());
app.use(express.json());

// GET all ads
app.get("/ads", async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (error) {
    console.error("Error fetching ads:", error);
    res.status(500).json({ message: "Failed to retrieve ads" });
  }
});

// GET all categories
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to retrieve categories" });
  }
});

// GET all tags
app.get("/tags", async (req, res) => {
  try {
    const tags = await Tags.find();
    res.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ message: "Failed to retrieve tags" });
  }
});


// CREATE new ad
app.post("/ads", async (req, res) => {
  const ad = new Ad ();
  ad.title = req.body.title;
  ad.description = req.body.description;
  ad.owner = req.body.owner;
  ad.price = req.body.price;
  ad.picture = req.body.picture;
  ad.location = req.body.location;
  ad.createdAt = req.body.createdAt;
  if (req.body.categoryId) {
    const category = await Category.findOneBy({ id: req.body.categoryId });
    if (category) {
      ad.category = category;
    }
  }
  
  if (req.body.tagsId) {
    const tags = await Tags.findOneBy({ id: req.body.tagsId });
    if (tags) {
      ad.tags = tags;
    }
  }
  

  await ad.save();

  res.send(ad);
});

// CREATE new category
app.post("/categories", (req, res) => {
  const category = new Category();

  category.name = req.body.name;
  category.description = req.body.description;

  category.save()
    .then((savedCategory) => {
      res.status(201).json(savedCategory);
    })
    .catch((error) => {
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Failed to create category" });
    });
});

// CREATE new tag
app.post("/tags", (req, res) => {
  const tags = new Tags();

  tags.name = req.body.name;

  tags.save()
    .then((savedTags) => {
      res.status(201).json(savedTags);
    })
    .catch((error) => {
      console.error("Error creating tag:", error);
      res.status(500).json({ message: "Failed to create tag" });
    });
});



// UPDATE ad
app.put("/ads/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const ad = await Ad.findOneBy({ id })
  if (ad !== null) {
    ad.title = req.body.title;
    ad.description = req.body.description;
    ad.owner = req.body.owner;
    ad.price = req.body.price;
    ad.picture = req.body.picture;
    ad.location = req.body.location;
    ad.createdAt = req.body.createdAt;

    ad.save();
  }
  res.send(ad);
});

// UPDATE category
app.put("/category/:id", async (req, res) => {
  try {
    // récuprére les données du body & l'id
    const body = req.body;
    const id = Number.parseInt(req.params.id);

    //met a jour l'article en fonction des informations du body
    await Ad.update({ id: id }, body);

    //message reponse
    res.status(200).send("article modifié avec succès");
  } catch (error) {
    //renvoyer un message eurreur
    res.status(500).send("erreur lors de la modification de l'article");
  }
});

// UPDATE tags
app.put("/tags/:id", async (req, res) => {
  try {
    // récuprére les données du body & l'id
    const body = req.body;
    const id = Number.parseInt(req.params.id);

    //met a jour l'article en fonction des informations du body
    await Ad.update({ id: id }, body);

    //message reponse
    res.status(200).send("article modifié avec succès");
  } catch (error) {
    //renvoyer un message eurreur
    res.status(500).send("erreur lors de la modification de l'article");
  }
});


// DELETE ad
app.delete("/ads/:id", async (req, res) => {
  await Ad.delete({id :Number.parseInt(req.params.id) });
  res.status(200).send(`Ad number ${req.params.id} has been deleted! `)
});

// DELETE category
app.delete("/category/:id", async (req, res) => {
  Category.delete({id: Number.parseInt(req.params.id)})
  await res.send("Ad has been remove")
});

// DELETE tags
app.delete("/tags/:id", async (req, res) => {
  Tags.delete({id: Number.parseInt(req.params.id)})
  await res.send("tag has been remove")
});


// Start server and initialize database connection
app.listen(port, async () => {
  try {
    await dataSource.initialize();
    console.log(`Database connection established`);
    console.log(`Server listening on port ${port}`);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
});