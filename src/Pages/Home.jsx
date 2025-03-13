import React from "react";

import Hero from "../components/hero";
import Category from "../components/Category";
import Products from "./Products";
import MarketingCard from "../components/MarketingCard";
import GuideCards from "../components/GuideCards";



const Home = () => {
  return (
    <div className="  w-full h-auto mx-auto pb-24 py-4 px-4 lg:px-16">
      <div className="container mx-auto px-6 md:px-10 pt-8">
        <Hero />
      </div>
      <div className="container mx-auto px-6 md:px-10 pt-8">
        <Category />
      </div>

      <div className="container h-auto mx-auto px-6 md:px-10 pt-8">
        <Products showTShirtSelector={false} />
      </div>
      <div className="container h-auto mx-auto px-6 md:px-10 pt-8">
        <MarketingCard />
      </div>
      <div className="container h-auto  mx-auto px-2 md:px-2 pt-8">
       <GuideCards/>
      </div>
      
    </div>
  );
};

export default Home;
