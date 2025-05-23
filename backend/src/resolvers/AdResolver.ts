import {
    Arg,
    Field,
    ID,
    InputType,
    Mutation,
    Query,
    Resolver,
  } from "type-graphql";
  import Ad from "../entities/Ad";
  import { FindManyOptions, ILike, In } from "typeorm";
  import Category from "../entities/Category";
  import Tag from "../entities/Tags";
  import { PaginationInput } from "../types/PaginationInput";
  import { NotFoundError, ValidationError } from "../errors/CustomError";
  
  @InputType()
  class AdInput {
    @Field()
    title!: string;
  
    @Field()
    description!: string;
  
    @Field()
    owner!: string;
  
    @Field()
    price!: number;
  
    @Field()
    picture!: string;
  
    @Field()
    location!: string;
  
    @Field(() => ID)
    category!: Category;
  
    @Field(() => [ID])
    tags!: Tag[];
  }
  
  @InputType()
  class SearchInput {
    @Field(() => String, { nullable: true })
    query?: string;
  
    @Field(() => ID, { nullable: true })
    categoryId?: number;
  
    @Field(() => [ID], { nullable: true })
    tagIds?: number[];
  
    @Field(() => Number, { nullable: true })
    minPrice?: number;
  
    @Field(() => Number, { nullable: true })
    maxPrice?: number;
  }
  
  @Resolver(Ad)
  export default class AdResolver {
    @Query(() => [Ad])
    async getAllAds(
      @Arg("pagination", { nullable: true }) pagination?: PaginationInput
    ) {
      try {
        const findOptions: FindManyOptions<Ad> = {
          relations: { category: true, tags: true },
          skip: pagination?.skip || 0,
          take: pagination?.take || 10,
          order: pagination?.sortBy
            ? { [pagination.sortBy]: pagination.sortOrder || "ASC" }
            : { createdAt: "DESC" },
        };
  
        return await Ad.find(findOptions);
      } catch (error) {
        throw new Error("Failed to fetch ads");
      }
    }
  
    @Query(() => Ad)
    async getAd(@Arg("id") id: number) {
      try {
        const ad = await Ad.findOne({
          where: { id },
          relations: { category: true, tags: true },
        });
        
        if (!ad) {
          throw new NotFoundError(`Ad with id ${id} not found`);
        }
        
        return ad;
      } catch (error) {
        if (error instanceof NotFoundError) throw error;
        throw new Error("Failed to fetch ad");
      }
    }
  
    @Query(() => [Ad])
    async searchAds(
      @Arg("searchInput") searchInput: SearchInput,
      @Arg("pagination", { nullable: true }) pagination?: PaginationInput
    ) {
      try {
        const where: any = {};
  
        if (searchInput.query) {
          where.title = ILike(`%${searchInput.query}%`);
        }
  
        if (searchInput.categoryId) {
          where.category = { id: searchInput.categoryId };
        }
  
        if (searchInput.tagIds?.length) {
          where.tags = { id: In(searchInput.tagIds) };
        }
  
        if (searchInput.minPrice || searchInput.maxPrice) {
          where.price = {};
          if (searchInput.minPrice) where.price.gte = searchInput.minPrice;
          if (searchInput.maxPrice) where.price.lte = searchInput.maxPrice;
        }
  
        const findOptions: FindManyOptions<Ad> = {
          where,
          relations: { category: true, tags: true },
          skip: pagination?.skip || 0,
          take: pagination?.take || 10,
          order: pagination?.sortBy
            ? { [pagination.sortBy]: pagination.sortOrder || "ASC" }
            : { createdAt: "DESC" },
        };
  
        return await Ad.find(findOptions);
      } catch (error) {
        throw new Error("Failed to search ads");
      }
    }
  
    @Mutation(() => Ad)
    async createAd(@Arg("data") data: AdInput) {
      try {
        if (!data.title || !data.description) {
          throw new ValidationError("Title and description are required");
        }
  
        const ad = Ad.create({
          ...data,
          tags: data.tags.map((tag) => ({ id: Number(tag) })),
        });
  
        await ad.save();
        return await Ad.findOne({
          where: { id: ad.id },
          relations: { category: true, tags: true },
        });
      } catch (error) {
        if (error instanceof ValidationError) throw error;
        throw new Error("Failed to create ad");
      }
    }
  
    @Mutation(() => Ad)
    async updateAd(@Arg("id") id: number, @Arg("data") data: AdInput) {
      try {
        const ad = await Ad.findOne({
          where: { id },
          relations: { category: true, tags: true },
        });
  
        if (!ad) {
          throw new NotFoundError(`Ad with id ${id} not found`);
        }
  
        Object.assign(ad, data, {
          tags: data.tags.map((tag) => ({ id: Number(tag) })),
        });
  
        await ad.save();
        return await Ad.findOne({
          where: { id },
          relations: { category: true, tags: true },
        });
      } catch (error) {
        if (error instanceof NotFoundError) throw error;
        throw new Error("Failed to update ad");
      }
    }
  
    @Mutation(() => Boolean)
    async deleteAd(@Arg("id") id: number) {
      try {
        const ad = await Ad.findOneBy({ id });
        
        if (!ad) {
          throw new NotFoundError(`Ad with id ${id} not found`);
        }
  
        await Ad.delete({ id });
        return true;
      } catch (error) {
        if (error instanceof NotFoundError) throw error;
        throw new Error("Failed to delete ad");
      }
    }
  }