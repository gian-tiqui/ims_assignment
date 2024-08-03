import { ChangeEvent, useEffect } from "react";
import { useSearchStore } from "../store/useSearchStore";
import { useMakesStore } from "../store/useMakesStore";
import { useOriginStore } from "../store/useOriginStore";
import { useYearStore } from "../store/useYearStore";
import axios from "axios";
import { BiSearch } from "react-icons/bi";

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
    <div>
      <div className="mt-10 md:mt-20 rounded-lg shadow-lg lg:w-[1440px] p-2 grid place-content-center h-24">
        <div className="flex items-center justify-center w-80 font-semibold md:w-full lg:w-[1100px] pb-1 text-2xl md:text-3xl md:font-semibold text-neutral-400 placeholder-neutral-400 border-b-2 border-b-neutral-400">
          {!input && (
            <BiSearch className="absolute left-[70px] md:left-[300px] lg:left-[600px]" />
          )}
          <input
            placeholder="I'm looking for a..."
            value={input}
            onChange={handleChange}
            className={`bg-transparent border-transparent focus:outline-none text-center`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-5 md:justify-between md:gap-3 md:w-[700px]">
        <select
          value={selectedMake}
          className="h-24 p-3 font-mono font-bold text-xl md:text-3xl rounded-lg shadow-lg lg:w-[450px] place-content-center"
          onChange={handleMakeChange}
        >
          <option value="" className="text-xl font-bold md:text-3xl">
            All makes
          </option>
          {makes &&
            makes.map((make, index) => (
              <option
                className="text-xl font-bold md:text-3xl"
                key={index}
                value={make}
              >
                {make}
              </option>
            ))}
        </select>
        <select
          value={selectedYear}
          className="h-24 p-3 font-mono font-bold text-xl md:text-3xl rounded-lg shadow-lg lg:w-[450px] place-content-center"
          onChange={handleYearChange}
        >
          <option value="" className="text-xl font-bold md:text-3xl">
            All years
          </option>
          {years.map((year) => (
            <option
              className="text-xl font-bold md:text-3xl"
              key={year.year}
              value={year.value}
            >
              {year.year}
            </option>
          ))}
        </select>
        <select
          value={selectedOrigin}
          className="h-24 p-3 font-mono font-bold text-xl md:text-3xl rounded-lg shadow-lg lg:w-[450px] place-content-center"
          onChange={handleOriginChange}
        >
          <option value="" className="text-xl font-bold md:text-3xl">
            All origins
          </option>
          {origins &&
            origins.map((origin, index) => (
              <option className="text-3xl font-bold" key={index} value={origin}>
                {origin.toUpperCase()}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBox;
