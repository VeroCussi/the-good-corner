export interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  picture: string;
  location: string;
  owner: string;
  createdAt: string;
  category: Category;
  tags: Tag[];
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface PaginationInput {
  skip?: number;
  take?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface SearchInput {
  query?: string;
  categoryId?: number;
  tagIds?: number[];
  minPrice?: number;
  maxPrice?: number;
}

export interface AdInput {
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  category: number;
  tags: number[];
}

export type AdCardProps = {
    id: number,
    title: string,
    picture: string,
    price: number, 
    link: string
};
