"use client";
import Loader from "@/components/Loader";
import axiosInstance from "@/lib/axios";
import { ProductT } from "@/models/Product";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoFilterSharp } from "react-icons/io5";
import { MdOutlineClear } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

const Products = () => {
	const [products, setProducts] = useState<ProductT[] | null>(null);
	const [filteredProducts, setFilteredProducts] = useState<ProductT[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [filterOpen, setFilterOpen] = useState<boolean>(false);
	const [filters, setFilters] = useState({
		sortBy: "none",
		category: "all",
	});

	const fetchProducts = async () => {
		try {
			const response = await axiosInstance.get("/api/products");
			const data = response.data;

			if (data.result) {
				setProducts(data?.products || []);
				setFilteredProducts(data?.products || []);
			} else {
				toast.error(data.message || "Facing some internal server issue");
			}
		} catch (error: any) {
			toast.error(error?.message);
		} finally {
			setLoading(false);
		}
	};

	const applyFilters = () => {
		if (!products) return;

		let filtered = [...products];

		if (filters.sortBy === "low-to-high") {
			filtered.sort((a: any, b: any) => a.price - b.price);
		} else if (filters.sortBy === "high-to-low") {
			filtered.sort((a: any, b: any) => b.price - a.price);
		}

		if (filters.category !== "all") {
			filtered = filtered.filter((item) => item.category === filters.category);
		}

		setFilteredProducts(filtered);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		applyFilters();
	}, [filters]);

	if (loading) {
		return <Loader />;
	}

	if (filteredProducts.length === 0) {
		return (
			<>
				<div className="h-[80vh]">
					<div className=" flex items-center justify-center text-center text-xl font-semibold mt-10 ">
						No products found
					</div>
					<div className=" bg-white px-5 flex justify-center py-3 gap-3 ">
						<button
							onClick={() => setFilters({ sortBy: "none", category: "all" })}
							className="flex items-center gap-3  py-2 px-6 rounded-full bg-indigo-50 text-indigo-600 font-semibold duration-500  justify-center hover:bg-indigo-100">
							<MdOutlineClear />
							<span>Clear Filters</span>
						</button>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<section className="py-32 lg:py-40 relative z-0 bg-gray-50">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
					<h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl  text-gray-900 mb-5 md:text-5xl md:leading-normal">
						<span className="text-indigo-600">Products</span>
					</h1>
				</div>
			</section>
			<section className="py-24">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className=" bg-white   w-full px-5 left-0 lg:flex justify-between py-3 gap-3 sticky top-[83px] hidden">
						<button
							onClick={() => setFilterOpen(!filterOpen)}
							className="flex items-center gap-3 text-center px-6 w-full py-2 rounded-[100px] bg-indigo-600 justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
							<IoFilterSharp />
							<span>Filters</span>
						</button>
						<button
							onClick={() => setFilters({ sortBy: "none", category: "all" })}
							className="flex items-center gap-3 py-2 px-6 rounded-full bg-indigo-50 text-indigo-600 font-semibold duration-500 w-full justify-center hover:bg-indigo-100">
							<MdOutlineClear />
							<span>Clear</span>
						</button>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{filteredProducts.map((item) => {
							return (
								<Link
									key={String(item._id)}
									href={`/products/${item._id}`}
									className="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto border-2 border-black/20 p-2 rounded-2xl bg-white transition-all duration-500">
									<div>
										<img
											src={item.imageUrl}
											alt={item.name}
											className="w-full aspect-square rounded-2xl hover:scale-105 duration-200 object-cover"
										/>
									</div>
									<div className="mt-5 mx-2">
										<div className="flex items-center justify-between">
											<h6 className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
												{item.name}
											</h6>
											<h6 className="font-semibold text-xl group-hover:text-indigo-600">
												₹ {item.price}
											</h6>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
					<div className="fixed bg-white bottom-0 z-10 w-full lg:hidden px-5 left-0 flex justify-between py-3 gap-3 border-t-2 border-black/10">
						<button
							onClick={() => setFilterOpen(!filterOpen)}
							className="flex items-center gap-3 text-center px-6 w-full py-2 rounded-[100px] bg-indigo-600 justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
							<IoFilterSharp />
							<span>Filters</span>
						</button>
						<button
							onClick={() => setFilters({ sortBy: "none", category: "all" })}
							className="flex items-center gap-3 py-2 px-6 rounded-full bg-indigo-50 text-indigo-600 font-semibold duration-500 w-full justify-center hover:bg-indigo-100">
							<MdOutlineClear />
							<span>Clear</span>
						</button>
					</div>
					<div>
						<div
							className={
								filterOpen
									? "fixed bottom-0 left-0 w-screen h-[600px] bg-white text-black z-10 duration-700"
									: "fixed left-0 bottom-[-100%] w-[300px] h-[600px] bg-white text-black z-10 duration-700"
							}>
							<div className="flex justify-between px-6 py-3 md:py-5 md:px-10 border-b-2 border-black/20">
								<div className="font-semibold text-xl md:text-2xl">Filters</div>
								<div
									className="text-xl md:text-2xl cursor-pointer mt-1.5"
									onClick={() => setFilterOpen(!filterOpen)}>
									<RxCross1 />
								</div>
							</div>
							<div className="flex items-center justify-evenly flex-col gap-4 text-xl font-semibold mt-10 md:text-2xl">
								<div
									className="cursor-pointer"
									onClick={() => {
										setFilters({ ...filters, sortBy: "low-to-high" });
										setFilterOpen(!filterOpen);
									}}>
									<span>Low to High</span>
								</div>
								<div
									className="cursor-pointer"
									onClick={() => {
										setFilters({ ...filters, sortBy: "high-to-low" });
										setFilterOpen(!filterOpen);
									}}>
									<span>High to Low</span>
								</div>
								<div className="border-t-2 border-black/20 pt-5 cursor-pointer w-full text-center">
									<div
										onClick={() => {
											setFilters({ ...filters, category: "men" });
											setFilterOpen(!filterOpen);
										}}>
										Men
									</div>
								</div>
								<div
									className="cursor-pointer"
									onClick={() => {
										setFilters({ ...filters, category: "women" });
										setFilterOpen(!filterOpen);
									}}>
									Women
								</div>
								<div
									className="cursor-pointer"
									onClick={() => {
										setFilters({ ...filters, category: "kids" });
										setFilterOpen(!filterOpen);
									}}>
									Kids
								</div>
								<div
									className="border-t-2 border-black/20 pt-5 cursor-pointer w-full text-center"
									onClick={() => {
										setFilters({ ...filters, category: "popular" });
										setFilterOpen(!filterOpen);
									}}>
									Popular
								</div>
								<div
									className="cursor-pointer"
									onClick={() => {
										setFilters({ ...filters, category: "featured" });
										setFilterOpen(!filterOpen);
									}}>
									Featured
								</div>
								<div
									className="cursor-pointer"
									onClick={() => {
										setFilters({ ...filters, category: "trending" });
										setFilterOpen(!filterOpen);
									}}>
									Trending
								</div>
								<div
									className="cursor-pointer"
									onClick={() => {
										setFilters({ ...filters, category: "sale" });
										setFilterOpen(!filterOpen);
									}}>
									Sale
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Products;
