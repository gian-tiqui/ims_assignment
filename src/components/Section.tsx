import SearchBox from "./SearchBox";

const Section = () => {
  return (
    <section className="grid h-screen bg-white place-content-center">
      <div>
        <div className="flex justify-center pb-4 border-b-4 border-yellow-300">
          <h1 className="text-3xl font-semibold text-center w-72">
            What can we do for you?
          </h1>
        </div>

        <SearchBox />
      </div>
    </section>
  );
};

export default Section;
