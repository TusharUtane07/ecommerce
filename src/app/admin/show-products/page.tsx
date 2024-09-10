"use client";
import axiosInstance from "@/lib/axios";
import { ProductT } from "@/models/Product";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ShowProduct = () => {
	const [products, setProducts] = useState<ProductT[]>([]);

	const fetchProducts = async () => {
		try {
			const response = await axiosInstance.get("/api/products");
			const data = response.data;
			if (data.result) {
				console.log(data);
				setProducts(data.products || []);
				toast.success(data.message || "Fetched data successfully");
			} else {
				toast.error(data.message || "Failed to fetch products");
			}
		} catch (error: any) {
			toast.error(error?.message);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className="py-24">
			<div className="w-full flex-col justify-center items-center gap-4 flex">
				<h2 className="text-center text-gray-900 text-4xl font-bold font-manrope leading-normal">
					Show Products
				</h2>
			</div>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10 my-7">
				<table className="w-full text-sm text-left rtl:text-right text-gray-50">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
						<tr>
							<th scope="col" className="px-6 py-3">
								Product image
							</th>
							<th scope="col" className="px-6 py-3">
								Product name
							</th>
							<th scope="col" className="px-6 py-3">
								Price
							</th>
							<th scope="col" className="px-6 py-3">
								Description
							</th>
							<th scope="col" className="px-6 py-3">
								Category
							</th>
							<th scope="col" className="px-6 py-3">
								Brand
							</th>
							<th scope="col" className="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{products &&
							products?.map((item) => {
								return (
									<tr className="text-gray-900  border-b ">
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
											<Image
												height={80}
												width={80}
												src={item.imageUrl}
												alt="Product Image"
											/>
										</th>
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
											{item.name}
										</th>
										<td className="px-6 py-4">${item.price}</td>
										<td className="px-6 py-4 w-72">{item.description}</td>
										<td className="px-6 py-4">{item.category}</td>
										<td className="px-6 py-4">{item.brand}</td>
										<td className="px-6 mt-10 flex gap-2">
											<Link
												href={`/admin/edit-products/${item._id}`}
												className="font-medium text-blue-600 text-xl">
												<FaEdit />
											</Link>
											<Link
												href="#"
												className="font-medium text-blue-600 text-xl">
												<MdDelete />
											</Link>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ShowProduct;
