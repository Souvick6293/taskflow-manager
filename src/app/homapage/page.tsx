import React from "react";
import Header from "../_components/Header";
import Banner from "../_components/Banner";

const HomePage = () => {
  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="w-[95%] m-[auto]">
        <Header/>
        <Banner/>
      </div>
    </div>
  );
};

export default HomePage;
