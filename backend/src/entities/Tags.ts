import { 
    BaseEntity, 
    Column, Entity, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn 
  } from "typeorm";
  import { Ad } from "./Ad";
  
  @Entity()
  export class Tags extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    name: string;

    // Relación: Un tag puede tener muchos anuncios
      @OneToMany(() => Ad, ad => ad.tags)
      ads: Tags[];

  }