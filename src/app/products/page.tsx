"use client";
import Loader from "@/components/Loader";
import axiosInstance from "@/lib/axios";
import { ProductT } from "@/models/Product";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";

const Products = () => {
	const [products, setProducts] = useState<ProductT[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchProducts = async () => {
		try {
			const response = await axiosInstance.get("/api/products");
			const data = response.data;

			if (data.result) {
				setProducts(data?.products || []);
			} else {
				toast.error(data.message || "Facing some internal server issue");
			}
		} catch (error: any) {
			toast.error(error?.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<section className="py-32 lg:py-40 relative z-0 bg-gray-50">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
					<h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl  text-gray-900 mb-5 md:text-5xl md:leading-normal">
						<span className="text-indigo-600">Products </span>
					</h1>
				</div>
			</section>
			<section className="py-24">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{products?.map((item) => {
							return (
								<Link
									href={`/products/${item._id}`}
									className="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto border-2 border-black/20 p-2 rounded-2xl bg-white transition-all duration-500">
									<div>
										<img
											src={item.imageUrl}
											alt="face cream image"
											className="w-full aspect-square rounded-2xl hover:scale-105 duration-200 object-cover"
										/>
									</div>
									<div className="mt-5 mx-2">
										<div className="flex items-center justify-between">
											<h6 className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
												{item.name}
											</h6>
											<h6 className="font-semibold flex items-center gap-3 text-xl leading-8 group-hover:text-indigo-600">
												<AiOutlineShoppingCart size={20} />
												<FaRegHeart size={17} />
											</h6>
										</div>
										<div className="flex items-center justify-between group-hover:text-indigo-600">
											<h6 className="font-semibold text-sm  ">
												₹ {item.price}
											</h6>
											<p className="mt-2 font-normal text-sm  text-gray-500 group-hover:text-indigo-600">
												{item.category}
											</p>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
			</section>
		</>
	);
};

export default Products;
