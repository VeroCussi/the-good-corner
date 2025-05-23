import { DataSource } from "typeorm";
import Ad from "../src/entities/Ad";
import Category from "../src/entities/Category";
import Tag from "../src/entities/Tags";
import * as fs from 'fs';

// Configuración para SQLite
const sqliteDataSource = new DataSource({
  type: "sqlite",
  database: "good_corner.sqlite",
  entities: [Ad, Category, Tag],
  synchronize: false,
  logging: false,
});

async function exportData() {
  try {
    await sqliteDataSource.initialize();
    console.log("Conectado a SQLite");

    // Exportar categorías
    const categories = await sqliteDataSource.getRepository(Category).find();
    fs.writeFileSync('categories-export.json', JSON.stringify(categories, null, 2));
    console.log(`Exportadas ${categories.length} categorías`);

    // Exportar tags
    const tags = await sqliteDataSource.getRepository(Tag).find();
    fs.writeFileSync('tags-export.json', JSON.stringify(tags, null, 2));
    console.log(`Exportados ${tags.length} tags`);

    // Exportar anuncios
    const ads = await sqliteDataSource.getRepository(Ad).find({
      relations: ['category', 'tags']
    });
    fs.writeFileSync('ads-export.json', JSON.stringify(ads, null, 2));
    console.log(`Exportados ${ads.length} anuncios`);

    await sqliteDataSource.destroy();
    console.log("Datos exportados exitosamente!");
  } catch (error) {
    console.error("Error exportando datos:", error);
  }
}

exportData(); 