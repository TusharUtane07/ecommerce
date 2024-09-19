"use client";
import { DropdownMenuDemo } from "@/components/DropdownMenu";
import Loader from "@/components/Loader";
import useGetUser from "@/hooks/useGetUser";
import axiosInstance from "@/lib/axios";
import { signOut } from "@/redux/authSlice";
import { RootState } from "@/redux/store";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";

const Header = () => {
	const [nav, setNav] = useState<boolean>(false);
	const { user, loading } = useGetUser();
	const pathname = usePathname();

	const dispatch = useDispatch();
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);

	if (loading) {
		return <Loader />;
	}

	const handleSignOut = async () => {
		try {
			const response = await axiosInstance.get("/api/sign-out");
			if (response.data.result) {
				toast.success("Signed Out");
				dispatch(signOut());
			}
		} catch (error) {
			toast.error("Signing Out Failed");
		}
	};

	const isActiveLink = (path: string) => pathname === path;

	return (
		<>
			<div className="mx-auto max-w-7xl flex justify-between py-6 px-5 sticky left-auto z-20 w-full bg-white top-0">
				<div className="font-semibold text-xl md:text-2xl">
					<Link href={"/"}>Nexa</Link>
				</div>
				<div className="hidden lg:flex items-center gap-8 font-medium">
					<div>
						<Link
							href={"/"}
							className={isActiveLink("/") ? "text-indigo-600 font-bold" : ""}>
							Home
						</Link>
					</div>
					<div>
						<Link
							href={"/products"}
							className={
								isActiveLink("/products") ? "text-indigo-600 font-bold" : ""
							}>
							Products
						</Link>
					</div>
					<div>
						<Link
							href={"/about"}
							className={
								isActiveLink("/about") ? "text-indigo-600 font-bold" : ""
							}>
							About
						</Link>
					</div>
					<div>
						<Link
							href={"/contact"}
							className={
								isActiveLink("/contact") ? "text-indigo-600 font-bold" : ""
							}>
							Contact
						</Link>
					</div>
					<div>
						<Link
							href={"/wishlist"}
							className={
								isActiveLink("/wishlist") ? "text-indigo-600 font-bold" : ""
							}>
							<FaRegHeart />
						</Link>
					</div>
					<div>
						<Link
							href={"/cart"}
							className={
								isActiveLink("/cart") ? "text-indigo-600 font-bold" : ""
							}>
							<AiOutlineShoppingCart />
						</Link>
					</div>
					{isAuthenticated ? (
						<DropdownMenuDemo signOut={handleSignOut} />
					) : (
						<div>
							<Link
								className="bg-indigo-600 px-5 py-3 rounded-md text-white"
								href={"/sign-in"}>
								Get Started
							</Link>
						</div>
					)}
				</div>
				<div
					className="text-xl md:text-2xl cursor-pointer lg:hidden"
					onClick={() => setNav(!nav)}>
					<GiHamburgerMenu />
				</div>
			</div>
			<div
				className={
					nav
						? "fixed top-0 left-0 w-screen h-full bg-white text-black z-30 duration-700"
						: "fixed top-0 left-[-100%] w-[300px] h-full bg-white text-black z-30 duration-700"
				}>
				<div className="flex justify-between mx-6 my-3 md:my-5 md:mx-10">
					<div className="font-semibold text-xl md:text-2xl">Nexa</div>
					<div
						className="text-xl md:text-2xl cursor-pointer mt-1.5"
						onClick={() => setNav(!nav)}>
						<RxCross1 />
					</div>
				</div>

				<div className="flex items-center justify-evenly flex-col gap-8 text-xl font-semibold mt-10 md:text-2xl">
					<div>
						<Link href={"/"} onClick={() => setNav(!nav)}>
							Home
						</Link>
					</div>
					<div>
						<Link href={"/products"} onClick={() => setNav(!nav)}>
							Products
						</Link>
					</div>
					<div>
						<Link href={"/about"} onClick={() => setNav(!nav)}>
							About
						</Link>
					</div>
					<div>
						<Link href={"/contact"} onClick={() => setNav(!nav)}>
							Contact
						</Link>
					</div>
					<div>
						<Link href={"/wishlist"} onClick={() => setNav(!nav)}>
							Wishlist
						</Link>
					</div>
					<div>
						<Link href={"/cart"} onClick={() => setNav(!nav)}>
							Cart
						</Link>
					</div>
					{isAuthenticated ? (
						<div className="flex gap-2 flex-col border-2 border-black p-2 rounded-xl items-center">
							<div className="flex gap-2 items-center">
								<img
									src={"assets/p1.jpg"}
									alt=""
									className="w-8 h-8 rounded-full"
								/>
								<p>{user?.username}</p>
							</div>
							<button onClick={handleSignOut}>Sign Out</button>
						</div>
					) : (
						<div>
							<Link href={"/sign-in"}>Get Started</Link>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Header;
