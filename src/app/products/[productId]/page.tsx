"use client";
import Loader from "@/components/Loader";
import useGetUser from "@/hooks/useGetUser";
import axiosInstance from "@/lib/axios";
import { ProductT } from "@/models/Product";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaAngleRight, FaHeart, FaRegHeart } from "react-icons/fa";
import { MdHome } from "react-icons/md";

const ProductDetails = ({ params }: any) => {
	const [productCartCount, setProductCartCount] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(true);
	const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
	const [isInCartList, setIsInCartList] = useState<boolean>(false);
	const [product, setProduct] = useState<ProductT>();
	const [cartItems, setCartItems] = useState<any>();

	const productId = params.productId;
	const { user } = useGetUser();
	const router = useRouter();

	const addToWishList = async (productId: any) => {
		try {
			const response = await axiosInstance.post("/api/wishlist", {
				userId: user?._id,
				productId,
			});

			if (response.data.result) {
				toast.success("Product added to wishlist");
				fetchProducts();
				setIsInWishlist(true);
			} else {
				toast.error(response.data.message);
			}
		} catch (error: any) {
			toast.error("Failed to add product to wishlist | Please Sign in");
		}
	};

	const addToCart = async () => {
		try {
			const response = await axiosInstance.post("/api/cart", {
				productId,
				quantity: productCartCount,
			});

			if (response.data.result) {
				toast.success("Product added to cart");
				setIsInCartList(true);
			}
		} catch (error) {
			toast.error("Failed to add product to cart | Please Sign in");
		}
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

	const handleIncreaseCartItemQuantity = async (
		productId: any,
		quantity: any
	) => {
		try {
			const response = await axiosInstance.patch("/api/cart", {
				productId,
				quantity: quantity + 1,
			});
			if (response.data.result) {
				toast.success("Quantity Increased");
				fetchCartListProducts();
			}
		} catch (error) {
			toast.error("Error Increasing Quantity");
		}
	};

	const handleDecreaseCartItemQuantity = async (
		productId: any,
		quantity: any
	) => {
		try {
			const response = await axiosInstance.patch("/api/cart", {
				productId,
				quantity: quantity - 1,
			});
			if (response.data.result) {
				toast.success("Quantity Decreased");
				fetchCartListProducts();
			}
		} catch (error) {
			toast.error("Can't go less than 1");
		}
	};

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

	const fetchWishlistProducts = async () => {
		try {
			const response = await axiosInstance.get(`/api/wishlist`);
			const data = response.data;

			if (data.result) {
				const isInWishlist = data.wishlist.products.some(
					(product: { _id: string }) => product._id === productId
				);
				setIsInWishlist(isInWishlist);
			} else {
				// toast.error(data.message || "Facing some internal server issue");
				console.log("This product is not in wishlist");
			}
		} catch (error: any) {
			toast.error("No products in wishlist");
		}
	};

	const fetchCartListProducts = async () => {
		try {
			const response = await axiosInstance.get(`/api/cart`);
			const data = response.data;
			const cartItem = data.cart.products.map((item: any) => {
				setCartItems(item);
			});
			if (data.result) {
				const isInCartList = data.cart.products.some(
					(item: any) => item.product._id === productId
				);
				setIsInCartList(isInCartList);
			} else {
				// toast.error(data.message || "Facing some internal server issue");
				console.log("This product is not in cart");
			}
		} catch (error: any) {
			console.log("No products in cart list");
		}
	};
	console.log(cartItems);
	const deleteProductFromWishlist = async (productId: any) => {
		try {
			const response = await axiosInstance.delete("/api/wishlist", {
				data: {
					userId: user?._id,
					productId,
				},
			});
			if (response.data.result) {
				toast.success("Product removed from wishlist");
				fetchProducts();
				setIsInWishlist(false);
			} else {
				toast.error(response.data.message);
			}
		} catch (error: any) {
			toast.error(error.message || "Error removing product from wishlist");
		}
	};

	const deleteProductFromCart = async () => {
		try {
			const response = await axiosInstance.delete(`/api/cart`, {
				data: { productId },
			});
			if (response.data.result) {
				toast.success("Removed item from cart");
				setIsInCartList(false);
				setProductCartCount(1);
			}
		} catch (error) {
			toast.error("Error removing item from cart");
		}
	};

	const buyNow = (productId: any) => {
		router.push("/checkout");
	};

	useEffect(() => {
		fetchProducts();
		fetchWishlistProducts();
		fetchCartListProducts();
	}, [isInWishlist, isInCartList]);

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
							</div>
							<p className="text-gray-500 text-base font-normal mb-5">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
								amet delectus quod ullam impedit labore illo sunt corporis ipsa
								magni. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
								Facere a sit expedita nihil possimus! Necessitatibus, impedit!
								In repudiandae perferendis laborum.
							</p>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-8">
								{isInCartList ? (
									<>
										<div className="">
											<div className="flex sm:items-center sm:justify-center w-full">
												<button
													onClick={() =>
														handleDecreaseCartItemQuantity(
															product?._id,
															cartItems.quantity
														)
													}
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
													{cartItems?.quantity}
												</span>
												<button
													onClick={() =>
														handleIncreaseCartItemQuantity(
															product?._id,
															cartItems.quantity
														)
													}
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
										</div>
										<button
											onClick={deleteProductFromCart}
											className="text-center w-full px-10 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
											Remove from cart
										</button>
									</>
								) : (
									<>
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
									</>
								)}
							</div>
							<div className="flex items-center gap-3">
								{isInWishlist ? (
									<button
										onClick={() => deleteProductFromWishlist(product?._id)}
										className="group transition-all duration-500 p-4 rounded-full bg-indigo-50 hover:bg-indigo-100 hover:shadow-sm hover:shadow-indigo-300">
										<FaHeart />
									</button>
								) : (
									<button
										onClick={() => addToWishList(product?._id)}
										className="group transition-all duration-500 p-4 rounded-full bg-indigo-50 hover:bg-indigo-100 hover:shadow-sm hover:shadow-indigo-300">
										<FaRegHeart />
									</button>
								)}
								<button
									onClick={() => buyNow(product?._id)}
									className="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
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
