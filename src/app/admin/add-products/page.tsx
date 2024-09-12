"use client";
import axiosInstance from "@/lib/axios";
import axios from "axios";
import {
	CldUploadButton,
	CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

// TODO: add breadcrumb to go back to home and also go to show products
const AddProduct = () => {
	const [name, setName] = useState<string>("");
	const [price, setPrice] = useState<string>("");
	const [category, setCategory] = useState<string>("men");
	const [brand, setBrand] = useState<string>("nike");
	const [description, setDescription] = useState<string>("");
	const [imageUrl, setImageUrl] = useState<string>("");

	const handleImageUpload = (result: CloudinaryUploadWidgetResults) => {
		const info = result.info;
		if (info && typeof info === "object" && "secure_url" in info) {
			setImageUrl(info.secure_url);
		}
	};

	const addProduct = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post("/api/products", {
				name,
				category,
				price,
				brand,
				imageUrl,
				description,
			});
			const data = response.data;
			toast.success(data.message);
			setBrand("");
			setCategory("");
			setName("");
			setPrice("");
			setImageUrl("");
			setDescription("");
		} catch (error: any) {
			const errorMessage = "Failed to add product, Check inputs properly";
			toast.error(errorMessage);
		}
	};

	return (
		<section className="py-24 lg:py-40 relative">
			<div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
				<div className="w-full flex-col justify-start items-start lg:gap-14 md:gap-10 gap-8 inline-flex">
					<div className="w-full flex-col justify-center items-center gap-4 flex">
						<h2 className="text-center text-gray-900 text-4xl font-bold font-manrope leading-normal">
							Add Products
						</h2>
					</div>
					<div className="w-full flex-col justify-start items-start gap-6 flex">
						<h4 className="text-gray-900 text-xl font-semibold leading-loose">
							Product Details
						</h4>
						<div className="w-full flex-col justify-start items-start gap-8 flex">
							<div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
								<div className="w-full flex-col justify-start items-start gap-1.5 flex">
									<label
										htmlFor={""}
										className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">
										Name
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={7}
											height={7}
											viewBox="0 0 7 7"
											fill="none">
											<path
												d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
												fill="#EF4444"
											/>
										</svg>
									</label>
									<input
										onChange={(e) => setName(e.target.value)}
										value={name}
										type="text"
										className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
										placeholder="Product Name"
									/>
								</div>
								<div className="w-full flex-col justify-start items-start gap-1.5 flex">
									<label
										htmlFor={""}
										className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">
										Price
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={7}
											height={7}
											viewBox="0 0 7 7"
											fill="none">
											<path
												d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
												fill="#EF4444"
											/>
										</svg>
									</label>
									<input
										onChange={(e) => setPrice(e.target.value)}
										value={price}
										type="number"
										className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
										placeholder="Product Price"
									/>
								</div>
							</div>
							<div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
								<div className="w-full flex-col justify-start items-start gap-1.5 flex">
									<label
										htmlFor={"category"}
										className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">
										Category
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={7}
											height={7}
											viewBox="0 0 7 7"
											fill="none">
											<path
												d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
												fill="#EF4444"
											/>
										</svg>
									</label>
									<select
										onChange={(e) => setCategory(e.target.value)}
										value={category}
										id="category"
										className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex">
										<option value="men">Men</option>
										<option value="women">Women</option>
										<option value="kids">Kids</option>
										<option value="featured">Featured</option>
										<option value="sale">Sale</option>
										<option value="popular">Popular</option>
										<option value="trending">Trending</option>
									</select>
								</div>
								<div className="w-full flex-col justify-start items-start gap-1.5 flex">
									<label
										htmlFor={"brand"}
										className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">
										Brand
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={7}
											height={7}
											viewBox="0 0 7 7"
											fill="none">
											<path
												d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
												fill="#EF4444"
											/>
										</svg>
									</label>
									<select
										onChange={(e) => setBrand(e.target.value)}
										value={brand}
										id="brand"
										className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex">
										<option selected value="nike">
											Nike
										</option>
									</select>
								</div>
							</div>
							<div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
								<div className="w-full flex-col justify-start items-start gap-1.5 flex">
									<label
										htmlFor={""}
										className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed">
										Description
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={7}
											height={7}
											viewBox="0 0 7 7"
											fill="none">
											<path
												d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
												fill="#EF4444"
											/>
										</svg>
									</label>
									<textarea
										onChange={(e) => setDescription(e.target.value)}
										value={description}
										className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
										placeholder="Product description"
									/>
								</div>
							</div>
						</div>
					</div>
					<CldUploadButton
						uploadPreset="lktcyhga"
						className="w-full"
						onSuccess={handleImageUpload}>
						<div className="w-full flex-col justify-start items-start gap-2.5 flex">
							<label
								htmlFor="dropzone-file"
								className="flex flex-col items-center justify-center py-9 w-full border border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 ">
								{imageUrl ? (
									<div>
										<Image
											src={imageUrl}
											alt="Product Image"
											width={270}
											height={270}
										/>
									</div>
								) : (
									<div className="mb-3 flex items-center justify-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={40}
											height={40}
											viewBox="0 0 40 40"
											fill="none">
											<g id="Upload 02">
												<path
													id="icon"
													d="M16.296 25.3935L19.9997 21.6667L23.7034 25.3935M19.9997 35V21.759M10.7404 27.3611H9.855C6.253 27.3611 3.33301 24.4411 3.33301 20.8391C3.33301 17.2371 6.253 14.3171 9.855 14.3171V14.3171C10.344 14.3171 10.736 13.9195 10.7816 13.4326C11.2243 8.70174 15.1824 5 19.9997 5C25.1134 5 29.2589 9.1714 29.2589 14.3171H30.1444C33.7463 14.3171 36.6663 17.2371 36.6663 20.8391C36.6663 24.4411 33.7463 27.3611 30.1444 27.3611H29.2589"
													stroke="#4F46E5"
													strokeWidth="1.6"
													strokeLinecap="round"
												/>
											</g>
										</svg>
									</div>
								)}
								<span className="text-center text-gray-400 text-xs font-normal leading-4 mb-1">
									PNG, JPG smaller than 15MB
								</span>
								<h6 className="text-center text-gray-900 text-sm font-medium leading-5">
									Drag and Drop your file here or
								</h6>
								<input id="dropzone-file" type="file" className="hidden" />
							</label>
						</div>
					</CldUploadButton>
					<button
						onClick={addProduct}
						className="mx-auto sm:w-fit w-full px-9 py-3 bg-indigo-600 hover:bg-indigo-700 ease-in-out transition-all duration-700 rounded-xl shadow justify-center items-center flex">
						<span className="px-3.5 text-center text-white text-lg font-semibold leading-8">
							Submit
						</span>
					</button>
				</div>
			</div>
		</section>
	);
};

export default AddProduct;
