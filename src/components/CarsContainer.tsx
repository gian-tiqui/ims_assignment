import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchStore } from "../store/useSearchStore";
import { useMakesStore } from "../store/useMakesStore";
import { useOriginStore } from "../store/useOriginStore";
import { useYearStore } from "../store/useYearStore";
import Car from "./Car";

export interface CarInterface {
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
  const { input } = useSearchStore();
  const { selectedMake } = useMakesStore();
  const { selectedOrigin } = useOriginStore();
  const { selectedYear, releaseFrom, releaseTo } = useYearStore();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem("autobase");
        const API_URL = `https://cars.development.ims.cx/cars?releaseFrom=${releaseFrom}&releaseTo=${releaseTo}&make=${selectedMake}&origin=${selectedOrigin}&search=${input}`;
        if (token) {
          const response = await axios.get(API_URL, {
            headers: {
              Authorization: token,
            },
          });

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
  }, [
    input,
    releaseFrom,
    releaseTo,
    selectedMake,
    selectedOrigin,
    selectedYear,
  ]);

  return (
    <div className="px-3 md:px-0">
      <div className="flex justify-center">
        <div className="grid h-24 px-10 bg-white w-80 md:w-[700px] rounded-b-lg place-content-center mb-20">
          <p className="font-mono text-4xl font-extrabold text-center text-black">
            {cars.length} cars found:
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 px-5 text-white md:grid-cols-2 lg:grid-cols-3">
        {error && <p>{error}</p>}
        {cars.length > 0 ? (
          cars.map((car) => <Car key={car._id} {...car} />)
        ) : (
          <p>No cars available</p>
        )}
      </div>
    </div>
  );
};

export default CarsContainer;
