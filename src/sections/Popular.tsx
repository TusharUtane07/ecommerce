import { ProductT } from "@/models/Product";
import Link from "next/link";
import React from "react";
import { FaRegHeart } from "react-icons/fa";

interface propsType {
	heading: string;
	products: ProductT[] | null;
}

const Featured = ({ heading, products }: propsType) => {
	return (
		<section className="py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h2 className="font-manrope font-bold text-4xl text-black mb-8 max-lg:text-center">
					{heading}
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{products &&
						products.map((item) => {
							return (
								<Link
									key={String(item._id)}
									href={`products/${item._id}`}
									className="mx-auto border border-black/10 p-2 rounded-xl sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
									<div>
										<img
											src={item.imageUrl}
											alt="face cream image"
											className="w-full aspect-square rounded-2xl object-contain"
										/>
									</div>
									<div className="mt-3 flex items-center justify-between mx-1">
										<div className="flex items-start flex-col">
											<h6 className="font-semibold text-sm text-black transition-all duration-500 group-hover:text-indigo-600">
												{item.name}
											</h6>
											<h6 className="font-semibold text-sm text-indigo-600">
												₹{item.price}
											</h6>
										</div>
										<div>{/* <FaRegHeart /> */}</div>
									</div>
								</Link>
							);
						})}
				</div>
			</div>
		</section>
	);
};

export default Featured;
