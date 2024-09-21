"use client";
import Loader from "@/components/Loader";
import axiosInstance from "@/lib/axios";
import { ProductT } from "@/models/Product";
import ProductsGrid from "@/sections/ProductGrid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoFilterSharp, IoSearchSharp } from "react-icons/io5";
import { MdOutlineClear } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

const Products = () => {
	const [products, setProducts] = useState<ProductT[] | null>(null);
	const [filteredProducts, setFilteredProducts] = useState<ProductT[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [filterOpen, setFilterOpen] = useState<boolean>(false);
	const [resetPage, setResetPage] = useState<boolean>(false);
	const [searchQuery, setSearchQuery] = useState<string>("");
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

		if (searchQuery) {
			filtered = filtered.filter((product) =>
				product.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		setFilteredProducts(filtered);
		setResetPage(true);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		applyFilters();
	}, [filters, searchQuery]);

	if (loading) {
		return <Loader />;
	}

	if (filteredProducts.length === 0) {
		return (
			<>
				<div className="h-[80vh]">
					<div className="flex items-center justify-center text-center text-xl font-semibold mt-10">
						No products found
					</div>
					<div className="bg-white px-5 flex justify-center py-3 gap-3">
						<button
							onClick={() => setFilters({ sortBy: "none", category: "all" })}
							className="flex items-center gap-3 py-2 px-6 rounded-full bg-indigo-50 text-indigo-600 font-semibold duration-500 justify-center hover:bg-indigo-100">
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
					<div className=" bg-white w-full px-5 left-0 lg:flex justify-between py-3 gap-3 sticky z-10 top-[83px] hidden">
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

					<div className="flex items-center max-w-7xl mx-auto my-4">
						<label htmlFor="simple-search" className="sr-only">
							Search
						</label>
						<div className="relative w-full flex gap-2">
							<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
								<IoSearchSharp />
							</div>
							<input
								type="text"
								id="simple-search"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block md:py-2 w-full ps-10 p-2.5 focus:outline-none md:text-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600"
								placeholder="Search products"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
					</div>

					<ProductsGrid
						products={filteredProducts}
						resetPage={resetPage}
						setResetPage={setResetPage}
					/>
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
							<div className="flex items-center px-6 py-4 gap-2 text-lg md:text-xl">
								<p>Sort By</p>
								<select
									className="w-full p-2 md:p-3 border border-black/10 rounded-md"
									value={filters.sortBy}
									onChange={(e) =>
										setFilters({ ...filters, sortBy: e.target.value })
									}>
									<option value="none">None</option>
									<option value="low-to-high">Price: Low to High</option>
									<option value="high-to-low">Price: High to Low</option>
								</select>
							</div>
							<div className="flex items-center px-6 py-4 gap-2 text-lg md:text-xl">
								<p>Category</p>
								<select
									className="w-full p-2 md:p-3 border border-black/10 rounded-md"
									value={filters.category}
									onChange={(e) =>
										setFilters({ ...filters, category: e.target.value })
									}>
									<option value="all">All</option>
									<option value="tech">Tech</option>
									<option value="home">Home</option>
									<option value="sports">Sports</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Products;
