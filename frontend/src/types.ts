export type Category = {
  id: number;
  name: string;
};

export type Ad = {
    id: number;
    title: string;
    price: number;
    picture: string;
  };

export type AdCardProps = {
    id: string,
    title: string,
    picture: string,
    price: number, 
    link: string
};
