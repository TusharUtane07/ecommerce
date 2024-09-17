"use client";
import Loader from "@/components/Loader";
import useGetUser from "@/hooks/useGetUser";
import axiosInstance from "@/lib/axios";
import { ProductT } from "@/models/Product";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaAngleRight } from "react-icons/fa";
import { MdHome } from "react-icons/md";

// TODO: add proper types
//BUG: fix that if there is no product with that id show no product found
const ProductDetails = ({ params }: any) => {
	const [productCartCount, setProductCartCount] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(true);

	const { user } = useGetUser();

	const addToWishList = async (productId: any) => {
		try {
			const response = await axiosInstance.post("/api/wishlist", {
				userId: user?._id,
				productId,
			});

			if (response.data.result) {
				toast.success("Product added to wishlist");
				fetchProducts();
			} else {
				toast.error(response.data.message);
			}
		} catch (error: any) {
			toast.error("Error adding product to wishlist");
		}
	};

	const addToCart = () => {
		toast.success("Product Added to Cart");
	};

	const handleIncreaseItem = () => {
		setProductCartCount(productCartCount + 1);
	};

	const handleDecreaseItem = () => {
		if (productCartCount <= 1) {
			toast.error("Can't go lesser than this");
			return;
		}
		setProductCartCount(productCartCount - 1);
	};

	const [product, setProduct] = useState<ProductT>();

	const productId = params.productId;

	const fetchProducts = async () => {
		try {
			const response = await axiosInstance.get(`/api/products/${productId}`);
			const data = response.data;
			if (data.result) {
				setProduct(data.product);
			}
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	if (loading) {
		return (
			<div>
				<Loader />
			</div>
		);
	}

	return (
		<section className="relative mx-4 py-20 lg:py-40">
			<div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
					<div className="img">
						<div className="img-box h-full max-lg:mx-auto p-5">
							<img
								src={product?.imageUrl}
								alt="Yellow Tropical Printed Shirt image"
								className="max-lg:mx-auto lg:ml-auto 
								rounded-xl object-contain  md:h-[500px]"
							/>
						</div>
					</div>
					<div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
						<div className="data w-full max-w-xl">
							<p className="text-lg font-semibold leading-8 text-indigo-600 mb-4 flex items-center gap-2">
								<Link href={"/"}>
									<MdHome size={26} />
								</Link>
								<span>
									<FaAngleRight />
								</span>
								<Link href={"/products"}>All Products</Link>
								<span>
									<FaAngleRight />
								</span>
							</p>
							<h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
								{product?.name}
							</h2>
							<div className="flex flex-col sm:flex-row sm:items-center mb-6">
								<h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5   mr-5">
									₹{product?.price}
								</h6>
								{/* <div className="flex items-center gap-2">
									<div className="flex items-center gap-1">
										<svg
											width={20}
											height={20}
											viewBox="0 0 20 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<g clipPath="url(#clip0_12029_1640)">
												<path
													d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
													fill="#FBBF24"
												/>
											</g>
											<defs>
												<clipPath id="clip0_12029_1640">
													<rect width={20} height={20} fill="white" />
												</clipPath>
											</defs>
										</svg>
										<svg
											width={20}
											height={20}
											viewBox="0 0 20 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<g clipPath="url(#clip0_12029_1640)">
												<path
													d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
													fill="#FBBF24"
												/>
											</g>
											<defs>
												<clipPath id="clip0_12029_1640">
													<rect width={20} height={20} fill="white" />
												</clipPath>
											</defs>
										</svg>
										<svg
											width={20}
											height={20}
											viewBox="0 0 20 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<g clipPath="url(#clip0_12029_1640)">
												<path
													d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
													fill="#FBBF24"
												/>
											</g>
											<defs>
												<clipPath id="clip0_12029_1640">
													<rect width={20} height={20} fill="white" />
												</clipPath>
											</defs>
										</svg>
										<svg
											width={20}
											height={20}
											viewBox="0 0 20 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<g clipPath="url(#clip0_12029_1640)">
												<path
													d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
													fill="#FBBF24"
												/>
											</g>
											<defs>
												<clipPath id="clip0_12029_1640">
													<rect width={20} height={20} fill="white" />
												</clipPath>
											</defs>
										</svg>
										<svg
											width={20}
											height={20}
											viewBox="0 0 20 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<g clipPath="url(#clip0_8480_66029)">
												<path
													d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
													fill="#F3F4F6"
												/>
											</g>
											<defs>
												<clipPath id="clip0_8480_66029">
													<rect width={20} height={20} fill="white" />
												</clipPath>
											</defs>
										</svg>
									</div>
									<span className="pl-2 font-normal leading-7 text-gray-500 text-sm ">
										1624 review
									</span>
								</div> */}
							</div>
							<p className="text-gray-500 text-base font-normal mb-5">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
								amet delectus quod ullam impedit labore illo sunt corporis ipsa
								magni. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
								Facere a sit expedita nihil possimus! Necessitatibus, impedit!
								In repudiandae perferendis laborum.
							</p>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-8">
								<div className="flex sm:items-center sm:justify-center w-full">
									<button
										onClick={handleDecreaseItem}
										className="group py-4 px-6 border border-gray-400 rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300">
										<svg
											className="stroke-gray-900 group-hover:stroke-black"
											width={22}
											height={22}
											viewBox="0 0 22 22"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M16.5 11H5.5"
												stroke={""}
												strokeWidth="1.6"
												strokeLinecap="round"
											/>
											<path
												d="M16.5 11H5.5"
												stroke={""}
												strokeOpacity="0.2"
												strokeWidth="1.6"
												strokeLinecap="round"
											/>
											<path
												d="M16.5 11H5.5"
												stroke={""}
												strokeOpacity="0.2"
												strokeWidth="1.6"
												strokeLinecap="round"
											/>
										</svg>
									</button>
									<span className="font-semibold text-gray-900 cursor-pointer text-lg py-[13px] px-6 w-full sm:max-w-[118px] outline-0 border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50">
										{productCartCount}
									</span>
									<button
										onClick={handleIncreaseItem}
										className="group py-4 px-6 border border-gray-400 rounded-r-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300">
										<svg
											className="stroke-gray-900 group-hover:stroke-black"
											width={22}
											height={22}
											viewBox="0 0 22 22"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M11 5.5V16.5M16.5 11H5.5"
												stroke="#9CA3AF"
												strokeWidth="1.6"
												strokeLinecap="round"
											/>
											<path
												d="M11 5.5V16.5M16.5 11H5.5"
												stroke="black"
												strokeOpacity="0.2"
												strokeWidth="1.6"
												strokeLinecap="round"
											/>
											<path
												d="M11 5.5V16.5M16.5 11H5.5"
												stroke="black"
												strokeOpacity="0.2"
												strokeWidth="1.6"
												strokeLinecap="round"
											/>
										</svg>
									</button>
								</div>
								<button
									onClick={addToCart}
									className="group py-4 px-5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-lg w-full flex items-center justify-center gap-2 transition-all duration-500 hover:bg-indigo-100">
									<svg
										className="stroke-indigo-600 "
										width={22}
										height={22}
										viewBox="0 0 22 22"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
											stroke={""}
											strokeWidth="1.6"
											strokeLinecap="round"
										/>
									</svg>
									Add to cart
								</button>
							</div>
							<div className="flex items-center gap-3">
								<button
									onClick={() => addToWishList(product?._id)}
									className="group transition-all duration-500 p-4 rounded-full bg-indigo-50 hover:bg-indigo-100 hover:shadow-sm hover:shadow-indigo-300">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={26}
										height={26}
										viewBox="0 0 26 26"
										fill="none">
										<path
											d="M4.47084 14.3196L13.0281 22.7501L21.9599 13.9506M13.0034 5.07888C15.4786 2.64037 19.5008 2.64037 21.976 5.07888C24.4511 7.5254 24.4511 11.4799 21.9841 13.9265M12.9956 5.07888C10.5204 2.64037 6.49824 2.64037 4.02307 5.07888C1.54789 7.51738 1.54789 11.4799 4.02307 13.9184M4.02307 13.9184L4.04407 13.939M4.02307 13.9184L4.46274 14.3115"
											stroke="#4F46E5"
											strokeWidth="1.6"
											strokeMiterlimit={10}
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
								<button className="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
									Buy Now
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
