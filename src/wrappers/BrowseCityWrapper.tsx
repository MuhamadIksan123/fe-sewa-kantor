import { useEffect, useState } from 'react';
import CityCard from '../components/CityCard';
import { City } from '../types/types';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function BrowseCityWrapper() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/cities', {
        headers: {
          'X-API-KEY': '1234',
        },
      })
      .then((response) => {
        setCities(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error}</p>;
  }

  return (
    <section id="Cities" className="flex flex-col gap-[30px] mt-[100px]">
      <div className="w-full max-w-[1130px] mx-auto flex items-center justify-between">
        <h2 className="font-bold text-[32px] leading-[48px] text-nowrap">
          You Can Choose <br />
          Our Favorite Cities
        </h2>
        <a href="#" className="rounded-full rounded-full py-3 px-5 bg-white font-bold">
          Explore All City
        </a>
      </div>
      <div className="swiper w-full">
        <div className="swiper-wrapper">
          {cities.map((city) => {
            return (
              <Link key={city.id} to={`/city/${city.slug}`}>
                <CityCard city={city} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
