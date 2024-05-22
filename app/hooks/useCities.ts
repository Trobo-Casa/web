import { useState, useEffect } from "react";
import axios from "axios";

interface City {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
}

const useCities = (cityName: string) => {
  const [data, setData] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?city=${cityName}&format=json`
        );
        const cities = response.data.map((city: any) => ({
          flag: "", // You need to provide a way to get the flag
          label: city.display_name,
          latlng: [city.lat, city.lon],
          region: city.state,
          value: city.name.toLowerCase().replace(/ /g, "-"),
        }));
        setData(cities);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (cityName) {
      fetchData();
    }
  }, [cityName]);

  return { data, loading };
};

export default useCities;
