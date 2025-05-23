import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Category from "./Category";
import Tag from "./Tags";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  owner: string;

  @Column()
  @Field()
  price: number;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @Column()
  @Field()
  picture: string;

  @Column()
  @Field()
  location: string;

  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  @Field(() => Category)
  category: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads, { eager: true })
  @JoinTable()
  @Field(() => [Tag])
  tags: Tag[];
}

export default Ad;

// VERSION EXPRESS
// import {
//     BaseEntity,
//     Column,
//     Entity,
//     ManyToOne,
//     ManyToMany,
//     PrimaryGeneratedColumn,
//     JoinColumn,
//     JoinTable
//   } from "typeorm";
//   import { Category } from "./Category";
//   import { Tags } from "./Tags";
  
//   @Entity()
//   export class Ad extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     id: number;
  
//     @Column({ length: 100 })
//     title: string;
  
//     @Column()
//     description: string;
  
//     @Column()
//     owner: string;
  
//     @Column()
//     price: number;
  
//     @Column()
//     picture: string;
  
//     @Column()
//     location: string;
  
//     @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
//     createdAt: Date;
  
//     // Relación: Muchos anuncios pueden pertenecer a una categoría
//     @ManyToOne(() => Category, category => category.ads, { eager: true })
//     @JoinColumn({ name: 'categoryId' })
//     category: Category;
  
//     // Columna para almacenar el ID de la categoría
//     @Column({ nullable: true })
//     categoryId: number;

//     // // Relación: Muchos anuncios pueden pertenecer a un TAG
//     // @ManyToOne(() => Tags, tags => tags.ads, { eager: true })
//     // @JoinColumn({ name: 'tagsId' })
//     // tags: Tags;
  
//     // // Columna para almacenar el ID de la tag
//     // @Column({ nullable: true })
//     // tagsId: number;

//     @ManyToMany(() => Tags, { eager: true })
//     @JoinTable()
//     tags: Tags[];


//   }