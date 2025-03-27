import { AdCardProps } from "../types";
import { Link } from "react-router-dom";


export const AdCard = ({ title, picture, price, link }: AdCardProps) => {
  return (
    <div className="ad-card-container">
      <Link className="ad-card-link" to={link}>
        <img className="ad-card-image" src={picture} alt={title} />
        <div className="ad-card-text">
          <div className="ad-card-title">{title}</div>
          <div className="ad-card-price">{price} €</div>
        </div>
      </Link>
    </div>
  );
};
