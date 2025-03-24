// Version con map

import { AdCard } from "./AdCard"

export const RecentAds = () => {
  const ads = [
    { title: "Table", imgUrl: "/images/table.webp", price: 120, link: "/ads/table" },
    { title: "Dame-jeanne", imgUrl: "/images/dame-jeanne.webp", price: 75, link: "/ads/dame-jeanne" },
    { title: "Vide-poche", imgUrl: "/images/vide-poche.webp", price: 4, link: "/ads/vide-poche" },
    { title: "Vaisselier", imgUrl: "/images/vaisselier.webp", price: 900, link: "/ads/vaisselier" },
    { title: "Bougie", imgUrl: "/images/bougie.webp", price: 8, link: "/ads/bougie" },
    { title: "Porte-magazine", imgUrl: "/images/porte-magazine.webp", price: 45, link: "/ads/porte-magazine" },
  ];

  return (
    <>
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {ads.map((ad, index) => (
          <AdCard
            key={index}
            title={ad.title}
            imgUrl={ad.imgUrl}
            price={ad.price}
            link={ad.link}
          />
        ))}
      </section>
    </>
  );
};

// Version sin map

// import { AdCard } from "./AdCard"

// export const RecentAds = () => {
//   return (
//     <>
//       <h2>Annonces récentes</h2>
//       <section className="recent-ads">
//         <AdCard 
//             title="Table"
//             imgUrl="/images/table.webp"
//             price={120}
//             link="/ads/table"
//         />
//         <AdCard
//             title="Dame-jeanne"
//             imgUrl="/images/dame-jeanne.webp"
//             price={75}
//             link="/ads/dame-jeanne"
//         />

       
//         <AdCard
//             title="Vide-poche"
//             imgUrl="/images/vide-poche.webp"
//             price={4}
//             link="/ads/vide-poche"
//         />
//         <AdCard
//             title="Vaisselier"
//             imgUrl="/images/vaisselier.webp"
//             price={900}
//             link="/ads/vaisselier"
//         />
//         <AdCard
//             title="Bougie"
//             imgUrl="/images/bougie.webp"
//             price={8}
//             link="/ads/bougie"
//         />
//         <AdCard
//             title="Porte-magazine"
//             imgUrl="/images/porte-magazine.webp"
//             price={45}
//             link="/ads/porte-magazine"
//         />
//       </section>
//     </>
//   )
// }
