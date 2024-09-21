import Link from "next/link";
import React from "react";

const Hero = () => {
	return (
		<div className="relative isolate px-6 pt-14 lg:px-8">
			<div className="mx-auto max-w-2xl py-20 sm:py-48 md:py-32 lg:py-32">
				<div className="hidden sm:mb-8 sm:flex sm:justify-center">
					<div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
						Announcing our next best products soon{" "}
					</div>
				</div>
				<div className="text-center">
					<h1 className="text-4xl font-bold capitalize tracking-tight text-gray-900 sm:text-6xl">
						Best footwear brand in the world.
					</h1>
					<p className="mt-6 text-lg leading-8 text-gray-600">
						Step into style and comfort with Nexa Footwear, where innovation
						meets quality. Discover the perfect fit for every step you take.
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Link
							href="/sign-in"
							className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							Get started
						</Link>
						<Link
							href="/products"
							className="text-sm font-semibold leading-6 text-gray-900">
							Products <span aria-hidden="true">→</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
