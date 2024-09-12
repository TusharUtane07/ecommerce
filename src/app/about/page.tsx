import CtaMail from "@/sections/CtaMail";
import React from "react";

const About = () => {
	return (
		<>
			<section className="py-32 lg:py-40 relative z-0 bg-gray-50">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
					<h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl  text-gray-900 mb-5 md:text-5xl md:leading-normal">
						Find Amazing Sneakers at{" "}
						<span className="text-indigo-600">Nexa </span>
					</h1>
					<p className="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9">
						Step confidently and discover a better way to elevate your style and
						comfort effortlessly with Nexa footwear.
					</p>
				</div>
			</section>
			<section className="py-14 lg:py-24 relative">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
						<div className="img-box">
							<img
								src="/assets/tushar.jpg"
								alt="About Us tailwind page"
								className="max-lg:mx-auto"
							/>
						</div>
						<div className="lg:pl-[100px] flex items-center">
							<div className="data w-full">
								<h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center relative">
									About Us{" "}
								</h2>
								<p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
									At Nexa, we blend style, comfort, and innovation to create
									footwear that elevates your every step. With a passion for
									craftsmanship and a commitment to quality, we design shoes
									that cater to diverse lifestyles and preferences. Our
									collections are crafted from premium materials, ensuring
									durability without compromising on fashion. Whether you're
									seeking the perfect pair for daily wear or a special occasion,
									Nexa has something for everyone. We believe in the power of
									individuality, and our shoes are designed to complement your
									unique personality. Step into the future of footwear with Nexa
									— where style meets substance.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="py-14 lg:py-24 relative">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
					<div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9 ">
						<div className="lg:pr-24 flex items-center">
							<div className="data w-full">
								<img
									src="https://pagedone.io/asset/uploads/1702034785.png"
									alt="About Us tailwind page"
									className="block lg:hidden mb-9 mx-auto"
								/>
								<h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center">
									We are Creative Since 2024
								</h2>
								<p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
									Our story at Nexa began with a simple idea: to create footwear
									that merges style and comfort without compromise. Founded by a
									team of passionate designers and innovators, we set out to
									redefine the way people experience shoes. From humble
									beginnings, we&apos;ve grown into a brand that values
									craftsmanship, quality, and attention to detail. Every step of
									our journey has been driven by the belief that footwear should
									empower people, not just fit them. As we continue to evolve,
									our mission remains the same: to craft shoes that inspire
									confidence and complement every walk of life.
								</p>
							</div>
						</div>
						<div className="img-box ">
							<img
								src="https://pagedone.io/asset/uploads/1702034785.png"
								alt="About Us tailwind page"
								className="hidden lg:block "
							/>
						</div>
					</div>
				</div>
			</section>
			<section className="py-10 bg-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<h2 className="font-manrope text-4xl text-center text-gray-900 font-bold mb-14">
						Our results in numbers
					</h2>
					<div className="flex flex-col gap-5 xl:gap-8 lg:flex-row lg:justify-between">
						<div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
							<div className="flex gap-5">
								<div className="font-manrope text-2xl font-bold text-indigo-600">
									0%
								</div>
								<div className="flex-1">
									<h4 className="text-xl text-gray-900 font-semibold mb-2">
										Company growth
									</h4>
									<p className="text-xs text-gray-500 leading-5">
										Company's remarkable growth journey as we continually
										innovate and drive towards new heights of success.
									</p>
								</div>
							</div>
						</div>
						<div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
							<div className="flex gap-5">
								<div className="font-manrope text-2xl font-bold text-indigo-600">
									0+
								</div>
								<div className="flex-1">
									<h4 className="text-xl text-gray-900 font-semibold mb-2">
										Company growth
									</h4>
									<p className="text-xs text-gray-500 leading-5">
										Our very talented team members are the powerhouse of
										pagedone and pillars of our success.{" "}
									</p>
								</div>
							</div>
						</div>
						<div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-gray-100">
							<div className="flex gap-5">
								<div className="font-manrope text-2xl font-bold text-indigo-600">
									0+
								</div>
								<div className="flex-1">
									<h4 className="text-xl text-gray-900 font-semibold mb-2">
										Projects Completed
									</h4>
									<p className="text-xs text-gray-500 leading-5">
										We have accomplished more than 0 products worldwide and we
										are still counting many more.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<CtaMail />
		</>
	);
};

export default About;
