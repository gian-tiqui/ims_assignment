import axios from "axios";
import { useEffect, useState } from "react";

interface CarInterface {
  _id: string;
  name: string;
  make: string;
  release: string;
  origin: string;
  image: string;
}

const CarsContainer = () => {
  const [cars, setCars] = useState<CarInterface[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem("autobase");

        if (token) {
          const response = await axios.get(
            `https://cars.development.ims.cx/cars`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          const rData: CarInterface[] = response.data.cars;

          setCars(rData);
        } else {
          console.log("No token found in localStorage");
          setError("No token found in localStorage");
        }
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(`Error: ${error.message}`);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="text-white">
      {error && <p>{error}</p>}
      {cars.length > 0 ? (
        cars.map((car) => (
          <div key={car._id}>
            <h2>{car.name}</h2>
            <p>{car.make}</p>
            <p>{car.release}</p>
            <p>{car.origin}</p>
          </div>
        ))
      ) : (
        <p>No cars available</p>
      )}
    </div>
  );
};

export default CarsContainer;
