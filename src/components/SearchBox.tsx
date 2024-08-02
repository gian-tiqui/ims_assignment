import { ChangeEvent, useEffect } from "react";
import { useSearchStore } from "../store/useSearchStore";
import { useMakesStore } from "../store/useMakesStore";
import axios from "axios";
import { useOriginStore } from "../store/useOriginStore";

interface YearsInterface {
  year: string;
  value: string;
}

const SearchBox = () => {
  const { input, setInput } = useSearchStore();
  const { makes, setMakes } = useMakesStore();
  const { origins, setOrigins } = useOriginStore();

  const years: YearsInterface[] = [
    {
      year: "All years",
      value: "",
    },
    {
      year: "2020s",
      value: "2020",
    },
    {
      year: "2010s",
      value: "2010",
    },
    {
      year: "2000s",
      value: "2000",
    },
    {
      year: "1990s",
      value: "1990",
    },
    {
      year: "1980s",
      value: "1980",
    },
    {
      year: "1970s",
      value: "1970",
    },
    {
      year: "1960s",
      value: "1960",
    },
    {
      year: "1950s and older",
      value: "1950",
    },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log(input);
  };

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const token = localStorage.getItem("autobase");
        const response = await axios.get(
          "https://cars.development.ims.cx/cars/makes",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const responseData = response.data.makes;
        setMakes(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMakes();
  }, [setMakes]);

  useEffect(() => {
    const fetchOrigins = async () => {
      try {
        const token = localStorage.getItem("autobase");
        const response = await axios.get(
          "https://cars.development.ims.cx/cars/origins",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const responseData = response.data.origins;
        setOrigins(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrigins();
  }, [setOrigins]);

  return (
    <div className="flex flex-col items-center">
      <input
        placeholder="I am looking for a..."
        value={input}
        onChange={handleChange}
      />
      <select>
        {makes &&
          makes.map((make, index) => (
            <option key={index} value={make}>
              {make}
            </option>
          ))}
      </select>
      <select>
        {origins &&
          origins.map((origin, index) => (
            <option key={index} value={origin}>
              {origin}
            </option>
          ))}
      </select>
      <select>
        {years.map((year) => (
          <option key={year.year} value={year.value}>
            {year.year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBox;
