"use client";
import Loader from "@/components/Loader";
import axiosInstance from "@/lib/axios";
import { ProductT } from "@/models/Product";
import { User } from "@/models/User";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";

const WishList = () => {
	const [wishlist, setWishlist] = useState<
		{ user: User; products: ProductT[] }[]
	>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const router = useRouter();

	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);

	const fetchProducts = async () => {
		try {
			const response = await axiosInstance.get("/api/wishlist");
			const data = response.data;
			if (data.result) {
				setWishlist(data.wishlist);
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
		if (isAuthenticated) {
			fetchProducts();
		} else {
			router.push("/sign-in");
		}
	}, [isAuthenticated]);

	if (loading) {
		return <Loader />;
	}

	return (
		<section className="py-24 lg:py-40">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h2 className="font-manrope font-bold text-4xl text-black mb-8 max-lg:text-center">
					Wishlist
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{wishlist.length > 0 ? (
						wishlist.map((item) =>
							item.products.map((product) => (
								<Link
									key={String(product._id)}
									href={`products/${product._id}`}
									className="mx-auto border border-black/10 p-2 rounded-xl sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
									<div>
										<img
											src={product.imageUrl}
											alt={product.name}
											className="w-full aspect-square rounded-2xl object-contain"
										/>
									</div>
									<hr />
									<div className="mt-3 flex items-center justify-between mx-1">
										<div className="flex items-start flex-col">
											<h6 className="font-semibold text-sm text-black transition-all duration-500 group-hover:text-indigo-600">
												{product.name}
											</h6>
											<h6 className="font-semibold text-sm text-indigo-600">
												₹{product.price}
											</h6>
										</div>
										<div>
											<BiTrash />
										</div>
									</div>
								</Link>
							))
						)
					) : (
						<div className="text-center text-gray-500">
							No products in your wishlist.
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default WishList;
