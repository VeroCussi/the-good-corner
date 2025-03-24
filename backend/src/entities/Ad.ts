import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
  } from "typeorm";
  import { Category } from "./Category";
  import { Tags } from "./Tags";
  
  @Entity()
  export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    title: string;
  
    @Column()
    description: string;
  
    @Column()
    owner: string;
  
    @Column()
    price: number;
  
    @Column()
    picture: string;
  
    @Column()
    location: string;
  
    @Column()
    createdAt: Date;
  
    // Relación: Muchos anuncios pueden pertenecer a una categoría
    @ManyToOne(() => Category, category => category.ads, { eager: true })
    @JoinColumn({ name: 'categoryId' })
    category: Category;
  
    // Columna para almacenar el ID de la categoría
    @Column({ nullable: true })
    categoryId: number;

    // Relación: Muchos anuncios pueden pertenecer a un TAG
    @ManyToOne(() => Tags, tags => tags.ads, { eager: true })
    @JoinColumn({ name: 'tagsId' })
    tags: Tags;
  
    // Columna para almacenar el ID de la tag
    @Column({ nullable: true })
    tagsId: number;

  }