"use client";
import Loader from "@/components/Loader";
import axiosInstance from "@/lib/axios";
import { ProductT } from "@/models/Product";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const ShowProduct = () => {
	const [products, setProducts] = useState<ProductT[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const router = useRouter();

	const fetchProducts = async () => {
		try {
			const response = await axiosInstance.get("/api/products");
			const data = response.data;

			if (data.result) {
				setProducts(data.products || []);
				toast.success(data.message || "Fetched data successfully");
			} else {
				toast.error(data.message || "Failed to fetch products");
			}
		} catch (error: any) {
			toast.error(error?.message);
		} finally {
			setLoading(false);
		}
	};

	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);
	const [user, setUser] = useState("not-user"); // change this later according to user details
	useEffect(() => {
		if (isAuthenticated) {
			if (user === "user") {
				toast.success("Welcome Admin");
			} else {
				toast.error("This page is for Admin only admins can sign-in");
				router.push("/sign-in");
			}
		} else {
			toast.success("This page is for Admin only admins can sign-in");
			router.push("/sign-in");
		}
	}, [isAuthenticated]);

	const deleteProduct = async (productId: any) => {
		try {
			const response = await axiosInstance.delete(`/api/products/${productId}`);
			if (response.data.result) {
				toast.success("Product deleted successfully");
				router.refresh();
				window.location.reload();
			} else {
				toast.error(response.data.message);
			}
		} catch (error: any) {
			toast.error(error?.message || "Error deleting product");
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="py-24 lg:py-40">
			<div className="w-full flex-col justify-center items-center gap-4 flex">
				<h2 className="text-center text-gray-900 text-4xl font-bold font-manrope leading-normal">
					Show Products
				</h2>
			</div>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10 my-7">
				{products && products.length > 0 ? (
					<table className="w-full text-sm text-left rtl:text-right text-gray-50">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
							{products.map((item) => (
								<tr key={String(item._id)} className="text-gray-900 border-b">
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
										<button
											onClick={() => deleteProduct(item._id)}
											className="font-medium text-blue-600 text-xl">
											<MdDelete />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<>
						<h1 className="text-center py-10">No products found</h1>
						<div className="bg-indigo-500 text-white w-60 mx-auto text-center px-5 py-2 my-3 rounded-full">
							<Link href={"/admin/add-products"}>Add Products</Link>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ShowProduct;
