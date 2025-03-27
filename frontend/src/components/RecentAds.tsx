// Version con map
import { useEffect, useState } from "react";
import { AdCard } from "./AdCard"
import axios from "axios";
import { toast } from 'react-toastify';
import { AdCardProps } from "../types";

export const RecentAds = () => {
  const [total, setTotal] = useState(0);
  const [ads, setAds] = useState<AdCardProps[]>([]);
  const fetchAds = async () => {
    try {
      const response = await axios.get("http://localhost:4000/ads");
      setAds(response.data);
    } catch (error) {
      console.error("Error fetching ads:", error);
      toast.error("Error fetching ads");
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Total: {total} €</p>
      <section className="recent-ads">
      {ads.map((ad, index) => (
        <div key={index}>
          <AdCard
            id={`ad-${index}`}
            title={ad.title}
            picture={ad.picture}
            price={ad.price}
            link={ad.link}
          />
          <button 
          className="button"
          onClick={() => setTotal(total + ad.price)}
          >Add price to total</button>
          </div>
        ))}
      </section>
    </>
  );
};
