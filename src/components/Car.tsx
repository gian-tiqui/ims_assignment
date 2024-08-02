import { CarInterface } from "./CarsContainer";

const Car: React.FC<CarInterface> = (car) => {
  return (
    <div
      key={car._id}
      className="flex flex-col items-center p-16 rounded-lg bg-neutral-400"
    >
      <section className="flex justify-between w-full mb-10">
        <h2 className="text-lg font-bold">{car.name}</h2>
        <img
          className="w-auto h-8 rounded-xl"
          src={`https://cars.development.ims.cx/assets/icons/flag-${car.origin}.svg`}
          alt={car.origin}
        ></img>
      </section>

      <div className="grid w-full mb-10 rounded-xl bg-neutral-200 h-44 place-content-center">
        <img
          className="w-auto h-20 md:h-32"
          src={`https://cars.development.ims.cx/assets/images/${car.image}`}
          alt={car.name}
        ></img>
      </div>
      <p className="text-xl text-black">Make</p>
      <p className="mb-5 text-xl font-semibold">{car.make}</p>
      <p className="text-xl text-black">Release Year</p>
      <p className="text-xl font-semibold">{car.release}</p>
    </div>
  );
};

export default Car;
