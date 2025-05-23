// Hooks & States
import { useState } from 'react'

// GraphQL
import {useGetAllAdsQuery} from "../../generated/graphql-types.ts";

// Components
import { AdCard } from '../components/AdCard.tsx';


export default function RecentAds() {
    const [ total, setTotal ] = useState(0)

    const { data, loading, error } = useGetAllAdsQuery();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <>
            <main className="main-content">
                <h2>Annonces récentes</h2>
                <h3>Total: {total} €</h3>
                <section className="recent-ads">
                    {data?.getAllAds.map((ad) => (
                        <div key={ad.id}>
                            <AdCard
                                id={ad.id}
                                title={ad.title}
                                picture={ad.picture}
                                price={ad.price}
                                link={`/ad/${ad.id}`} />
                                <button className='button' onClick={() => setTotal(total + ad.price)}>
                                    Ajouter le prix au total
                                </button>
                        </div>
                    ))}
                </section>
            </main>
        </>
    )
}