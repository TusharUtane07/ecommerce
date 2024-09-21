import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
	FaInstagramSquare,
	FaLinkedin,
	FaTwitter,
	FaUser,
	FaYoutube,
} from "react-icons/fa";
const Footer = () => {
	return (
		<footer className="bg-white">
			<div className="mx-auto w-full max-w-7xl px-4 md:px-5 lg:px-6">
				<footer className="footer max-w-7xl mx-auto w-full text-base-content p-10">
					<aside>
						<Image src={"/favicon.png"} alt="Logo" height={100} width={100} />
						<p>
							<span className="font-medium text-lg">Nexa</span>
							<br />
							Providing reliable services since 2024
						</p>
					</aside>
					<nav>
						<h6 className="footer-title">Navigation</h6>
						<Link href={"/"} className="link link-hover">
							Home
						</Link>
						<Link href={"/products"} className="link link-hover">
							Products
						</Link>
						<Link href={"/about"} className="link link-hover">
							About Us
						</Link>
						<Link href={"/contact"} className="link link-hover">
							Contact Us
						</Link>
					</nav>
					<nav>
						<h6 className="footer-title">Socials</h6>
						<Link href={"/"} className="link link-hover">
							Instagram
						</Link>
						<Link href={"/"} className="link link-hover">
							Facebook
						</Link>
						<Link href={"/"} className="link link-hover">
							Youtube
						</Link>
						<Link href={"/"} className="link link-hover">
							Twitter
						</Link>
					</nav>
					<nav>
						<h6 className="footer-title">Legal</h6>
						<p className="link link-hover">Terms of use</p>
						<p className="link link-hover">Privacy policy</p>
						<p className="link link-hover">Cookie policy</p>
					</nav>
				</footer>
				<hr />
				<div className="px-4 py-6  md:flex md:items-center md:justify-between">
					<span className="text-sm text-gray-500 sm:text-center">
						© 2024{" "}
						<Link target="_blank" href="https://www.tusharutane.com/">
							Tushar Utane
						</Link>
						. All Rights Reserved.
					</span>
					<div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
						<Link
							target="_blank"
							href="https://www.instagram.com/tushar_utane/"
							className="text-gray-400 hover:text-gray-900">
							<FaInstagramSquare />
						</Link>
						<Link
							target="_blank"
							href="https://twitter.com/tusharutane2"
							className="text-gray-400 hover:text-gray-900">
							<FaTwitter />
						</Link>
						<Link href="#" className="text-gray-400 hover:text-gray-900">
							<FaYoutube />
						</Link>
						<Link
							target="_blank"
							href="https://www.linkedin.com/in/tushar-utane-492b00260/"
							className="text-gray-400 hover:text-gray-900">
							<FaLinkedin />
						</Link>
						<Link
							target="_blank"
							href="https://www.tusharutane.com"
							className="text-gray-400 hover:text-gray-900">
							<FaUser />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
