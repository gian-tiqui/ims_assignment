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
            `https://cars.development.ims.cx/cars?releaseFrom=&releaseTo=&make=&origin=&search=`,
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
    <div className="flex flex-wrap gap-5 text-white">
      {error && <p>{error}</p>}
      {cars.length > 0 ? (
        cars.map((car) => (
          <div
            key={car._id}
            className="flex flex-col items-center p-5 bg-black rounded-lg"
          >
            <section className="flex justify-between w-full">
              <h2>{car.name}</h2>
              <img
                className="w-auto h-8 rounded-lg"
                src={`https://cars.development.ims.cx/assets/icons/flag-${car.origin}.svg`}
                alt={car.origin}
              ></img>
            </section>

            <div className="grid bg-gray-700 rounded-lg w-44 h-44 place-content-center">
              <img
                className="w-auto h-20"
                src={`https://cars.development.ims.cx/assets/images/${car.image}`}
                alt={car.name}
              ></img>
            </div>
            <p>Make</p>
            <p>{car.make}</p>
            <p>Year</p>
            <p>{car.release}</p>
          </div>
        ))
      ) : (
        <p>No cars available</p>
      )}
    </div>
  );
};

export default CarsContainer;
