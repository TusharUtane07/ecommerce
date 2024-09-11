import Button from "@/components/Button";
import Image from "next/image";
import React from "react";

interface props {
	heading: string;
	subheading: string;
	paragraph: string;
	buttonText: string;
	img: string;
}

const CtaOne = ({ heading, subheading, paragraph, buttonText, img }: props) => {
	return (
		<div className="my-8 mx-5 md:px-8 md:mx-auto md:max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-3">
			<div className="flex flex-col gap-1">
				<h4 className="text-2xl md:text-4xl uppercase text-blue-500 font-extrabold">
					{heading}
				</h4>
				<h6 className="font-extrabold text-2xl md:text-3xl uppercase">
					{subheading}
				</h6>
				<p className=" mt-2 text-sm md:text-md md:w-96 lg:w-[450px]">
					{paragraph}
				</p>
				<Button btnText={buttonText} />
			</div>
			<div>
				<Image src={img} alt="Nike product image" width={500} height={500} />
			</div>
		</div>
	);
};

export default CtaOne;
