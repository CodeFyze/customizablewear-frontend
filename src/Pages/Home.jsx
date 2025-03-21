import React from "react";

import Hero from "../components/hero";
import Category from "../components/Category";
import Products from "./Products";
import Bundles from "./Bundles";


const Home = () => {
  return (
		<div className='container mx-auto pb-24 py-4 px-4 lg:px-16'>
			<div className='container mx-auto px-6 md:px-10 pt-8'>
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
		</div>
	);
};

export default Home;
