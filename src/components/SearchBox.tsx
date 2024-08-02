import { ChangeEvent, useEffect } from "react";
import { useSearchStore } from "../store/useSearchStore";
import { useMakesStore } from "../store/useMakesStore";
import { useOriginStore } from "../store/useOriginStore";
import { useYearStore } from "../store/useYearStore";
import axios from "axios";

interface YearsInterface {
  year: string;
  value: string;
}

const SearchBox = () => {
  const { input, setInput } = useSearchStore();
  const { makes, setMakes, selectedMake, setSelectedMake } = useMakesStore();
  const { origins, setOrigins, selectedOrigin, setSelectedOrigin } =
    useOriginStore();
  const { selectedYear, setSelectedYear } = useYearStore();

  const years: YearsInterface[] = [
    { year: "All years", value: "" },
    { year: "2020s", value: "2020" },
    { year: "2010s", value: "2010" },
    { year: "2000s", value: "2000" },
    { year: "1990s", value: "1990" },
    { year: "1980s", value: "1980" },
    { year: "1970s", value: "1970" },
    { year: "1960s", value: "1960" },
    { year: "1950s and older", value: "1950" },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleMakeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMake(e.target.value);
  };

  const handleOriginChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrigin(e.target.value);
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
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
      <select value={selectedMake} onChange={handleMakeChange}>
        <option value="">All makes</option>
        {makes &&
          makes.map((make, index) => (
            <option key={index} value={make}>
              {make}
            </option>
          ))}
      </select>
      <select value={selectedYear} onChange={handleYearChange}>
        <option value="">All years</option>
        {years.map((year) => (
          <option key={year.year} value={year.value}>
            {year.year}
          </option>
        ))}
      </select>
      <select value={selectedOrigin} onChange={handleOriginChange}>
        <option value="">All origins</option>
        {origins &&
          origins.map((origin, index) => (
            <option key={index} value={origin}>
              {origin}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SearchBox;
