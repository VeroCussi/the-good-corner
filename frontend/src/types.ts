export type Category = {
  id: number;
  name: string;
};

export type Ad = {
    id: number;
    title: string;
    description: string;
    price: number;
    owner: string;
    picture: string;
    location: string;
    category: string;
    tags: number[];
  };

export type AdCardProps = {
    id: number,
    title: string,
    picture: string,
    price: number, 
    link: string
};

export type Tags = {
  id: number;
  name: string;
};
