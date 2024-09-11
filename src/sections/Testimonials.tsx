import testimonials from "@/data/testimonials";
import React from "react";

import { BsStarFill } from "react-icons/bs";

const Testimonials = () => {
	return (
		<section className="">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h2 className="font-manrope capitalize font-bold text-4xl text-black mb-8 max-lg:text-center">
					Testimonials
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{testimonials.map((item) => {
						return (
							<div
								key={item.name}
								className="border border-black/10 p-3 rounded-xl">
								<div className="text-indigo-500 flex gap-1 items-center py-3">
									<BsStarFill />
									<BsStarFill />
									<BsStarFill />
									<BsStarFill />
									<BsStarFill />
								</div>
								<div className="flex items-center justify-start gap-3 font-extrabold pb-3">
									<img
										src={item.img}
										alt=""
										className="w-10 h-10 rounded-full"
									/>
									<p>{item.name}</p>
								</div>
								<div className="text-sm">
									<p>{item.description}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
