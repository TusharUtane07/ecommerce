import Link from "next/link";
import React from "react";
import {
	FaInstagramSquare,
	FaLinkedin,
	FaTwitter,
	FaUser,
	FaYoutube,
} from "react-icons/fa";
// TODO: work on this section
const Footer = () => {
	return (
		<footer className="bg-white">
			<div className="mx-auto w-full max-w-7xl px-4 md:px-5 lg:px-6">
				<div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
					<div>
						<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
							Company
						</h2>
						<ul className="text-gray-500 font-medium">
							<li className="mb-4">
								<a href="#" className="hover:underline">
									About
								</a>
							</li>
							<li className="mb-4">
								<a href="#" className="hover:underline">
									Careers
								</a>
							</li>
							<li className="mb-4">
								<a href="#" className="hover:underline">
									Brand Center
								</a>
							</li>
							<li className="mb-4">
								<a href="#" className="hover:underline">
									Blog
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
							Help center
						</h2>
						<ul className="text-gray-500 font-medium">
							<li className="mb-4">
								<a href="#" className="hover:underline">
									Discord Server
								</a>
							</li>
							<li className="mb-4">
								<a href="#" className="hover:underline">
									Twitter
								</a>
							</li>
							<li className="mb-4">
								<a href="#" className="hover:underline">
									Facebook
								</a>
							</li>
							<li className="mb-4">
								<a href="#" className="hover:underline">
									Contact Us
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
							Legal
						</h2>
						<ul className="text-gray-500 font-medium">
							<li className="mb-4">
								<a href="#" className="hover:underline">
									Privacy Policy
								</a>
							</li>
							<li className="mb-4">
								<a href="#" className="hover:underline">
									Licensing
								</a>
							</li>
							<li className="mb-4">
								<a href="#" className="hover:underline">
									Terms &amp; Conditions
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
							Download
						</h2>
						<ul className="text-gray-500 font-medium">
							<li className="mb-4">
								<a href="#" className="hover:underline">
									iOS
								</a>
							</li>
							<li className="mb-4">
								<a href="#" className="hover:underline">
									Android
								</a>
							</li>
							<li className="mb-4">
								<a href="#" className="hover:underline">
									Windows
								</a>
							</li>
							<li className="mb-4">
								<a href="#" className="hover:underline">
									MacOS
								</a>
							</li>
						</ul>
					</div>
				</div>
				<hr />
				<div className="px-4 py-6  md:flex md:items-center md:justify-between">
					<span className="text-sm text-gray-500 sm:text-center">
						© 2024{" "}
						<a target="_blank" href="https://www.tusharutane.com/">
							Tushar Utane
						</a>
						. All Rights Reserved.
					</span>
					{/* TODO: add links here */}
					<div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
						<Link href="#" className="text-gray-400 hover:text-gray-900">
							<FaInstagramSquare />
						</Link>
						<Link href="#" className="text-gray-400 hover:text-gray-900">
							<FaTwitter />
						</Link>
						<Link href="#" className="text-gray-400 hover:text-gray-900">
							<FaYoutube />
						</Link>
						<Link href="#" className="text-gray-400 hover:text-gray-900">
							<FaLinkedin />
						</Link>
						<Link href="#" className="text-gray-400 hover:text-gray-900">
							<FaUser />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
