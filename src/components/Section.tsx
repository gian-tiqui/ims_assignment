import SearchBox from "./SearchBox";

const Section = () => {
  return (
    <section className="flex md:h-[630px] bg-white border shadow-xl justify-center pb-32">
      <div className="flex flex-col items-center mt-36">
        <div className="flex justify-center pb-4 border-b-4 border-yellow-200 w-[300px] lg:w-[800px]">
          <h1 className="font-bold text-center text-3xl w-64 md:w-[800px] md:text-3xl lg:text-5xl">
            What can we do for you?
          </h1>
        </div>

        <SearchBox />
      </div>
    </section>
  );
};

export default Section;
