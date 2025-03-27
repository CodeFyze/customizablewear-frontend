import React from "react";

import Hero from "../components/hero";
import Category from "../components/Category";
import Products from "./Products";
import Bundles from "./Bundles";
import GuideCards from "../components/GuideCards";
import MarketingCard from "../components/MarketingCard";
import BrandCarousel from "../components/Brands";


const Home = () => {
  return (
		<div className='bg-green-50  pb-24 md:py-0  lg:px-0'>
			<div className=''>
				<Hero />
			</div>
			<div className='container mx-auto px-6 md:px-10 pt-8'>
				<Category />
			</div>

			<div className='container mx-auto px-6 md:px-10 pt-8'>
				<Products showTShirtSelector={false} />
			</div>
			<div className='container mx-auto px-6 md:px-10 pt-8'>
				<Bundles  />
			</div>
			<div className='container mx-auto px-6 md:px-10 pt-8'>
				<GuideCards/>
			</div>
			<div className='container mx-auto px-6 md:px-10 pt-8'>
				<MarketingCard/>
			</div>
			<div className='container mx-auto px-6 md:px-10 pt-8'>
				<BrandCarousel/>
			</div>
		</div>
	);
};

export default Home;
