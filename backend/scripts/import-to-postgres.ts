import { DataSource } from "typeorm";
import Ad from "../src/entities/Ad";
import Category from "../src/entities/Category";
import Tag from "../src/entities/Tags";
import * as fs from 'fs';

// Configuración para PostgreSQL
const postgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "good_corner",
  entities: [Ad, Category, Tag],
  synchronize: true,
  logging: false,
});

async function importData() {
  try {
    await postgresDataSource.initialize();
    console.log("Conectado a PostgreSQL");

    // Importar categorías
    if (fs.existsSync('categories-export.json')) {
      const categories = JSON.parse(fs.readFileSync('categories-export.json', 'utf8'));
      await postgresDataSource.getRepository(Category).save(categories);
      console.log(`Importadas ${categories.length} categorías`);
    }

    // Importar tags
    if (fs.existsSync('tags-export.json')) {
      const tags = JSON.parse(fs.readFileSync('tags-export.json', 'utf8'));
      await postgresDataSource.getRepository(Tag).save(tags);
      console.log(`Importados ${tags.length} tags`);
    }

    // Importar anuncios
    if (fs.existsSync('ads-export.json')) {
      const ads = JSON.parse(fs.readFileSync('ads-export.json', 'utf8'));
      
      for (const ad of ads) {
        // Recrear las relaciones
        if (ad.category) {
          ad.category = await postgresDataSource.getRepository(Category).findOne({
            where: { id: ad.category.id }
          });
        }
        
        if (ad.tags && ad.tags.length > 0) {
          const tagIds = ad.tags.map((tag: any) => tag.id);
          ad.tags = await postgresDataSource.getRepository(Tag).findByIds(tagIds);
        }
      }
      
      await postgresDataSource.getRepository(Ad).save(ads);
      console.log(`Importados ${ads.length} anuncios`);
    }

    await postgresDataSource.destroy();
    console.log("Datos importados exitosamente!");
  } catch (error) {
    console.error("Error importando datos:", error);
  }
}

importData(); 