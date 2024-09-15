import Link from "next/link";
import React from "react";

const Hero = () => {
	return (
		<div className="bg-white">
			<section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-40 lg:py-60">
				<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
						<div>
							<p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
								Where Style Meets Comfort
							</p>
							<h1 className="mt-4 text-4xl  font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
								Nexa Best in Footwear
							</h1>
						</div>
						<div>
							<img
								className="w-full"
								src="/assets/sections/nike-air-3.png"
								alt=""
							/>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Hero;
