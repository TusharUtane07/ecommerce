"use client";
import Loader from "@/components/Loader";
import useGetUser from "@/hooks/useGetUser";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

const Header = () => {
	const [nav, setNav] = useState<boolean>(false);
	const { user, loading } = useGetUser();

	if (loading) {
		return <Loader />;
	}

	console.log(user);
	return (
		<>
			<div className="flex items-center justify-between z-10 lg:flex fixed lg:my-0 w-full mx-auto bg-white top-0 p-5 border-b border-black/10">
				<div className="font-semibold text-xl md:text-2xl">
					<Link href={"/"}>Nexa</Link>
				</div>
				<div className="hidden lg:flex items-center gap-8 font-medium">
					<div>
						<Link href={"/"}>Home</Link>
					</div>
					<div>
						<Link href={"/products"}>Products </Link>
					</div>
					<div>
						<Link href={"/about"}>About </Link>
					</div>
					<div>
						<Link href={"/contact"}>Contact </Link>
					</div>
					<div>
						<Link href={"/wishlist"}>
							<FaRegHeart />{" "}
						</Link>
					</div>
					<div>
						<Link href={"/cart"}>
							<AiOutlineShoppingCart />{" "}
						</Link>
					</div>
					{user && user?.username?.length > 0 ? (
						<div>
							<img
								src={"assets/p1.jpg"}
								alt=""
								className="w-6 h-6 rounded-full"
							/>
						</div>
					) : (
						<div>
							<Link href={"/sign-in"}>Sign In</Link>
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
						? "fixed top-0 left-0 w-screen h-full bg-white text-black  z-10 duration-700"
						: "fixed top-0 left-[-100%] w-[300px]  bg-white  text-black z-10 duration-700"
				}>
				<div className="flex justify-between mx-6 my-3 md:my-5 md:mx-10">
					<div className="font-semibold text-xl md:text-2xl">Tushar.dev</div>
					<div
						className="text-xl md:text-2xl cursor-pointer mt-1.5"
						onClick={() => setNav(!nav)}>
						<RxCross1 />
					</div>
				</div>

				<div className="flex items-center justify-evenly flex-col gap-8 text-xl font-semibold mt-10 md:text-2xl">
					<div className="" onClick={() => setNav(!nav)}>
						Home
					</div>
					<div className="" onClick={() => setNav(!nav)}>
						Products
					</div>
					<div className="" onClick={() => setNav(!nav)}>
						Wishlist
					</div>
					<div className="" onClick={() => setNav(!nav)}>
						Cart
					</div>
					<div className="" onClick={() => setNav(!nav)}>
						About
					</div>
					<div className="" onClick={() => setNav(!nav)}>
						Contact
					</div>
					<div className="" onClick={() => setNav(!nav)}>
						Sign Out
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
