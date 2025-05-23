// import express from "express";
// //import sqlite3 from 'sqlite3';
// import "reflect-metadata";
// import dataSource from "./config/db";
// import { Like, In, FindOptionsWhere, FindManyOptions, ILike } from "typeorm";
// // import { Ad } from "./entities/Ad";
// // import { Category } from "./entities/Category";
// // import { Tags } from "./entities/Tags";
// import cors from "cors";

// const app = express();
// const port = 4000;

// //const db = new sqlite3.Database('good_corner.sqlite');

// // Middleware
// app.use(cors());
// app.use(express.json());

// // GET all ads
// app.get("/ads", async (req, res) => {
//   try {
//     const ads = await Ad.find();
//     res.json(ads);
//   } catch (error) {
//     console.error("Error fetching ads:", error);
//     res.status(500).json({ message: "Failed to retrieve ads" });
//   }
// });

// // GET ads by search query
// app.get("/ads/search", async (req, res) => {
  
//   const query = req.query.query?.toString().toLowerCase();

//   try {
//     const results = await Ad.find({
//       where: [
//         { title: Like(`%${query}%`) },
//         { description: Like(`%${query}%`) },
//       ],
//       relations: ["category", "tags"],
//     });

//     res.json(results);
//   } catch (error) {
//     console.error("Erreur de recherche :", error);
//     res.status(500).json({ message: "Erreur de recherche" });
//   }
// });

// // GET ad by Id
// app.get("/ads/:id", async (req, res) => {
//   const ad = await Ad.findOne({
//     where: { id: parseInt(req.params.id) },
//     relations: ['category', 'tags'],
//   });
//   res.json(ad);
// });

// // GET all categories
// app.get("/categories", async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     res.status(500).json({ message: "Failed to retrieve categories" });
//   }
// });

// // GET all tags
// app.get("/tags", async (req, res) => {
//   try {
//     const tags = await Tags.find();
//     res.json(tags);
//   } catch (error) {
//     console.error("Error fetching tags:", error);
//     res.status(500).json({ message: "Failed to retrieve tags" });
//   }
// });


// // CREATE new ad
// app.post("/ads", async (req, res) => {
//   const ad = new Ad ();
//   ad.title = req.body.title;
//   ad.description = req.body.description;
//   ad.owner = req.body.owner;
//   ad.price = req.body.price;
//   ad.picture = req.body.picture;
//   ad.location = req.body.location;
//   ad.createdAt = req.body.createdAt;
//   if (req.body.categoryId) {
//     const category = await Category.findOneBy({ id: req.body.categoryId });
//     if (category) {
//       ad.category = category;
//     }
//   }
  
//   // actualizado para que recibe array de tags
//   if (req.body.tagsId) {
//     const tagIds = Array.isArray(req.body.tagsId)
//       ? req.body.tagsId
//       : [req.body.tagsId]; 
  
//     const tags = await Tags.find({
//       where: { id: In(tagIds) },
//     });
  
//     ad.tags = tags;
//   }

//   await ad.save();

//   res.send(ad);
// });

// // CREATE new category
// app.post("/categories", (req, res) => {
//   const category = new Category();

//   category.name = req.body.name;
//   category.description = req.body.description;

//   category.save()
//     .then((savedCategory) => {
//       res.status(201).json(savedCategory);
//     })
//     .catch((error) => {
//       console.error("Error creating category:", error);
//       res.status(500).json({ message: "Failed to create category" });
//     });
// });

// // CREATE new tag
// app.post("/tags", (req, res) => {
//   const tags = new Tags();

//   tags.name = req.body.name;

//   tags.save()
//     .then((savedTags) => {
//       res.status(201).json(savedTags);
//     })
//     .catch((error) => {
//       console.error("Error creating tag:", error);
//       res.status(500).json({ message: "Failed to create tag" });
//     });
// });



// // UPDATE ad
// app.put("/ads/:id", async (req, res) => {
//   const id = parseInt(req.params.id);
//   const ad = await Ad.findOneBy({ id })
//   if (ad !== null) {
//     ad.title = req.body.title;
//     ad.description = req.body.description;
//     ad.owner = req.body.owner;
//     ad.price = req.body.price;
//     ad.picture = req.body.picture;
//     ad.location = req.body.location;
//     ad.createdAt = req.body.createdAt;

//     ad.save();
//   }
//   res.send(ad);
// });

// // UPDATE category
// app.put("/category/:id", async (req, res) => {
//   try {
//     // récuprére les données du body & l'id
//     const body = req.body;
//     const id = Number.parseInt(req.params.id);

//     //met a jour l'article en fonction des informations du body
//     await Ad.update({ id: id }, body);

//     //message reponse
//     res.status(200).send("article modifié avec succès");
//   } catch (error) {
//     //renvoyer un message eurreur
//     res.status(500).send("erreur lors de la modification de l'article");
//   }
// });

// // UPDATE tags
// app.put("/tags/:id", async (req, res) => {
//   try {
    
//     const body = req.body;
//     const id = Number.parseInt(req.params.id);

//     await Ad.update({ id: id }, body);

//     res.status(200).send("article modifié avec succès");
//   } catch (error) {
    
//     res.status(500).send("erreur lors de la modification de l'article");
//   }
// });


// // DELETE ad
// app.delete("/ads/:id", async (req, res) => {
//   await Ad.delete({id :Number.parseInt(req.params.id) });
//   res.status(200).send(`Ad number ${req.params.id} has been deleted! `)
// });

// // DELETE category
// app.delete("/category/:id", async (req, res) => {
//   Category.delete({id: Number.parseInt(req.params.id)})
//   await res.send("Ad has been remove")
// });

// // DELETE tags
// app.delete("/tags/:id", async (req, res) => {
//   Tags.delete({id: Number.parseInt(req.params.id)})
//   await res.send("tag has been remove")
// });


// Start server and initialize database connection
// app.listen(port, async () => {
//   try {
//     await dataSource.initialize();
//     console.log(`Database connection established`);
//     console.log(`Server listening on port ${port}`);
//   } catch (error) {
//     console.error("Failed to start server:", error);
//     process.exit(1);
//   }
// });

// APOLLO SEVER

import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import { buildSchema } from "type-graphql";
import dataSource from "./config/db";
import AdResolver from "./resolvers/AdResolver";
import CategoryResolver from "./resolvers/CategoryResolver";
import TagResolver from "./resolvers/TagResolver";
import { GraphQLFormattedError } from "graphql";

async function startServer() {
  // Initialize database
  await dataSource.initialize();
  console.log("Database initialized");

  // Create Express app
  const app = express();
  const httpServer = http.createServer(app);

  // Basic security middleware
  app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
  }));
  app.use(json());

  // Build GraphQL schema
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver],
    validate: false,
  });

  // Create Apollo Server
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    formatError: (formattedError: GraphQLFormattedError, error: unknown) => {
      console.error("GraphQL Error:", error);
      return formattedError;
    },
  });

  // Start server
  await server.start();

  // Apply middleware (correct order and types)
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, { context: async () => ({}) })
  );

  // Start listening
  const port = process.env.PORT || 4000;
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
}

startServer().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});