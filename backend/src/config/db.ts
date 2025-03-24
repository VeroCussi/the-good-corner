import { DataSource } from "typeorm";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Tags } from "../entities/Tags";

const dataSource = new DataSource({
    type: "sqlite",
    database: "good_corner.sqlite",
    entities: [ Ad, Tags, Category ],
    synchronize: true, //no utilizar en produccion
});

export default dataSource;