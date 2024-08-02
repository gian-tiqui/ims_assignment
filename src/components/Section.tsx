import SearchBox from "./SearchBox";

const Section = () => {
  return (
    <section className="grid h-[500px] md:h-[630px] bg-white border shadow-xl place-content-center">
      <div>
        <div className="flex justify-center px-10 pb-4 border-b-4 border-yellow-200">
          <h1 className="font-bold text-center lg:text-5xl">
            What can we do for you?
          </h1>
        </div>

        <SearchBox />
      </div>
    </section>
  );
};

export default Section;
