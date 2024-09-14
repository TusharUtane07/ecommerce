"use client";
import { DropdownMenuDemo } from "@/components/DropdownMenu";
import Loader from "@/components/Loader";
import useGetUser from "@/hooks/useGetUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

const Header = () => {
	const [nav, setNav] = useState<boolean>(false);
	const { user, loading } = useGetUser();

	const pathname = usePathname();
	console.log(pathname);

	const handleSignOut = () => {
		toast.success("Signed Out");
	};

	if (loading) {
		return <Loader />;
	}

	console.log(user);
	return (
		<>
			<div className="mx-auto max-w-7xl flex  justify-between py-6 px-5 sticky left-auto w-full bg-white top-0">
				<div className="font-semibold text-xl md:text-2xl">
					<Link href={"/"}>Nexa</Link>
				</div>
				<div className="hidden lg:flex items-center gap-8 font-medium">
					<div>
						<Link href={"/"}>Home</Link>
					</div>
					<div>
						<Link href={"/products"}>Products</Link>
					</div>
					<div>
						<Link href={"/about"}>About</Link>
					</div>
					<div>
						<Link href={"/contact"}>Contact</Link>
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
						<>
							<DropdownMenuDemo />
						</>
					) : (
						<div>
							<Link
								className="bg-indigo-600 px-5 py-2 rounded-md text-white"
								href={"/sign-in"}>
								Sign In
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
						? "fixed top-0 left-0 w-screen h-full bg-white text-black  z-10 duration-700"
						: "fixed top-0 left-[-100%] w-[300px] h-full bg-white  text-black z-10 duration-700"
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
					{user && user?.username?.length > 0 ? (
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
							<Link href={"/sign-in"}>Sign In</Link>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Header;
// flex items-center justify-center gap-10 z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center lg:flex fixed lg:my-0 w-full mx-auto bg-white top-0 p-5 border-b border-black/10
