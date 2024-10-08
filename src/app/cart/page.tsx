"use client";
import Loader from "@/components/Loader";
import axiosInstance from "@/lib/axios";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "../products/[productId]/page";
import { addProductToPurchaseList } from "@/redux/cartSlice";

const Cart = () => {
	const router = useRouter();
	const [cart, setCart] = useState<any>();
	const [loading, setLoading] = useState<boolean>(true);
	const [products, setProducts] = useState<ProductDetails[]>([{ price: "" }]);

	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);

	const fetchProducts = async () => {
		try {
			const response = await axiosInstance.get(`/api/cart`);
			const data = response.data;
			if (data.result) {
				setCart(data.cart);
			} else {
				toast.error(data.message || "Facing some internal server issue");
			}
		} catch (error: any) {
			toast.error("No products in cart");
		} finally {
			setLoading(false);
		}
	};

	const calculateSubtotal = () => {
		return cart?.products.reduce(
			(acc: number, item: any) => acc + item.product.price * item.quantity,
			0
		);
	};

	const handleIncreaseItem = async (productId: any, quantity: any) => {
		try {
			const response = await axiosInstance.patch("/api/cart", {
				productId,
				quantity: quantity + 1,
			});
			if (response.data.result) {
				toast.success("Quantity Increased");
				fetchProducts();
			}
		} catch (error) {
			toast.error("Error Increasing Quantity");
		}
	};

	const handleDecreaseItem = async (productId: any, quantity: any) => {
		try {
			const response = await axiosInstance.patch("/api/cart", {
				productId,
				quantity: quantity - 1,
			});
			if (response.data.result) {
				toast.success("Quantity Decreased");
				fetchProducts();
			}
		} catch (error) {
			toast.error("Can't go less than 1");
		}
	};

	const handleDeleteCartItem = async (productId: string) => {
		try {
			const response = await axiosInstance.delete(`/api/cart`, {
				data: { productId },
			});
			if (response.data.result) {
				toast.success("Removed item from cart");
				window.location.reload();
			}
		} catch (error) {
			toast.error("Error removing item from cart");
		}
	};

	const dispatch: AppDispatch = useDispatch();

	const buyNow = () => {
		const productDetails: ProductDetails = {
			price: calculateSubtotal(),
		};
		dispatch(addProductToPurchaseList(productDetails));
		router.push("/checkout");
	};

	useEffect(() => {
		if (isAuthenticated) {
			fetchProducts();
			console.log("Cart page");
		} else {
			router.push("/sign-in");
		}
	}, [isAuthenticated]);

	if (loading) {
		return <Loader />;
	}
	if (cart === undefined) {
		return (
			<>
				<div className="max-w-7xl mx-auto px-20  py-20 text-3xl text-center font-bold flex justify-center items-center">
					No products in cart
				</div>
				<div className="flex py-40 items-center flex-col sm:flex-row justify-center gap-3 mt-8">
					<Link
						href={"/products"}
						className="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
						<span className="px-2 font-semibold text-lg leading-8 text-indigo-600">
							Shop More
						</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={22}
							height={22}
							viewBox="0 0 22 22"
							fill="none">
							<path
								d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998"
								stroke="#4F46E5"
								strokeWidth="1.6"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</Link>
					<button className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">
						Continue to Payment
						<svg
							className="ml-2"
							xmlns="http://www.w3.org/2000/svg"
							width={23}
							height={22}
							viewBox="0 0 23 22"
							fill="none">
							<path
								d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998"
								stroke="white"
								strokeWidth="1.6"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</>
		);
	}

	return (
		<section className="py-24 lg:py-40 relative">
			<div className="w-full max-w-7xl px-4 md:px-5 lg-px-6 mx-auto">
				<h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
					Shopping Cart
				</h2>
				<div className="hidden lg:grid grid-cols-2 py-6">
					<div className="font-normal text-xl leading-8 text-gray-500">
						Product
					</div>
					<p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
						<span className="w-full max-w-[200px] text-center">
							{/* Delivery Charge */}
						</span>
						<span className="w-full max-w-[260px] text-center">Quantity</span>
						<span className="w-full max-w-[200px] text-center">Total</span>
						<span className="w-full max-w-[200px] text-center">Action</span>
					</p>
				</div>
				{cart?.products.map((item: any, index: any) => {
					return (
						<div
							key={index}
							className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
							<div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
								<div className="img-box">
									<img
										src={item.product?.imageUrl}
										alt="perfume bottle image"
										className="xl:w-[140px] rounded-xl object-cover"
									/>
								</div>
								<div className="pro-data w-full max-w-sm ">
									<h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
										{item.product.name}
									</h5>
									<p className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
										{item.product.category}
									</p>
									<h6 className="font-medium text-lg leading-8 text-indigo-600  max-[550px]:text-center">
										₹{item.product.price}
									</h6>
								</div>
							</div>
							<div className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
								<h6 className="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
									{/* $15.00{" "} */}
									<span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">
										{/* (Delivery Charge) */}
									</span>
								</h6>
								<div className="flex items-center w-full mx-auto justify-center">
									<button
										onClick={() =>
											handleDecreaseItem(item?.product._id, item?.quantity)
										}
										className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
										<svg
											className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
											xmlns="http://www.w3.org/2000/svg"
											width={22}
											height={22}
											viewBox="0 0 22 22"
											fill="none">
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
									<span className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent">
										{item.quantity}
									</span>
									<button
										onClick={() =>
											handleIncreaseItem(item?.product._id, item?.quantity)
										}
										className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
										<svg
											className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
											xmlns="http://www.w3.org/2000/svg"
											width={22}
											height={22}
											viewBox="0 0 22 22"
											fill="none">
											<path
												d="M11 5.5V16.5M16.5 11H5.5"
												stroke={""}
												strokeWidth="1.6"
												strokeLinecap="round"
											/>
											<path
												d="M11 5.5V16.5M16.5 11H5.5"
												stroke={""}
												strokeOpacity="0.2"
												strokeWidth="1.6"
												strokeLinecap="round"
											/>
											<path
												d="M11 5.5V16.5M16.5 11H5.5"
												stroke={""}
												strokeOpacity="0.2"
												strokeWidth="1.6"
												strokeLinecap="round"
											/>
										</svg>
									</button>
								</div>
								<h6 className="text-indigo-600 font-manrope font-bold text-xl leading-9 w-full max-w-[176px] text-center">
									<span className="mx-auto">
										₹{item.quantity * item.product.price}
									</span>
								</h6>
								<h6 className="font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
									<MdOutlineDelete
										className="mx-auto cursor-pointer"
										onClick={() => handleDeleteCartItem(item.product._id)}
									/>
								</h6>
							</div>
						</div>
					);
				})}
				<div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
					<div className="flex items-center justify-between w-full py-6">
						<p className="font-manrope font-bold text-2xl leading-9 text-gray-900">
							Subtotal
						</p>
						<h6 className="font-manrope font-bold text-2xl leading-9 text-indigo-500">
							₹{calculateSubtotal()}
						</h6>
					</div>
				</div>
				<div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
					<Link
						href={"/products"}
						className="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
						<span className="px-2 font-semibold text-lg leading-8 text-indigo-600">
							Shop More
						</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={22}
							height={22}
							viewBox="0 0 22 22"
							fill="none">
							<path
								d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998"
								stroke="#4F46E5"
								strokeWidth="1.6"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</Link>
					<button
						onClick={buyNow}
						className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">
						Continue to Payment
						<svg
							className="ml-2"
							xmlns="http://www.w3.org/2000/svg"
							width={23}
							height={22}
							viewBox="0 0 23 22"
							fill="none">
							<path
								d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998"
								stroke="white"
								strokeWidth="1.6"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>
		</section>
	);
};

export default Cart;
