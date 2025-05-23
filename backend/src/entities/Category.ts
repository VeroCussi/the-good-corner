// import {
//   BaseEntity,
//   Column,
//   Entity,
//   OneToMany,
//   PrimaryGeneratedColumn
// } from "typeorm";
// import { Ad } from "./Ad";

// @Entity()
// export class Category extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ length: 100 })
//   name: string;

//   @Column({ nullable: true })
//   description: string;

//   // Relación: Una categoría puede tener muchos anuncios
//   @OneToMany(() => Ad, ad => ad.category)
//   ads: Ad[];
// }

import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Ad from "./Ad";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ unique: true })
  @Field()
  title: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  @Field(() => [Ad])
  ads: Ad[];
}

export default Category;
