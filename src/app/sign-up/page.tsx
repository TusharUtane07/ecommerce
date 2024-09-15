"use client";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface SignUpFormData {
	username: string;
	email: string;
	password: string;
}

const SignUp: React.FC = () => {
	const [formData, setFormData] = useState<SignUpFormData>({
		username: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState<boolean>(false);

	const router = useRouter();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const signUpUser = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await axiosInstance.post("/api/sign-up/", {
				username: formData.username,
				email: formData.email,
				password: formData.password,
			});

			const data = await response.data;

			if (data.result) {
				toast.success("Signed up successfully!");
				router.push("/sign-in");
			}
		} catch (error: any) {
			if (error.response && error.response.data) {
				toast.error(error.response.data.message || "An error occurred.");
			} else {
				toast.error("User creation failed.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
					Create your account
				</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form onSubmit={signUpUser}>
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-5 text-gray-700">
								Username
							</label>
							<div className="mt-1">
								<input
									id="username"
									name="username"
									type="text"
									required
									value={formData.username}
									onChange={handleInputChange}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
								/>
							</div>
						</div>

						<div className="mt-6">
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-5 text-gray-700">
								Email address
							</label>
							<div className="mt-1">
								<input
									id="email"
									name="email"
									type="email"
									required
									value={formData.email}
									onChange={handleInputChange}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
								/>
							</div>
						</div>

						<div className="mt-6">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-5 text-gray-700">
								Password
							</label>
							<div className="mt-1">
								<input
									id="password"
									name="password"
									type="password"
									required
									value={formData.password}
									onChange={handleInputChange}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
								/>
							</div>
						</div>

						<div className="mt-6">
							<button
								type="submit"
								className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out ${
									loading ? "opacity-50 cursor-not-allowed" : ""
								}`}
								disabled={loading}>
								{loading ? "Signing up..." : "Sign up"}
							</button>
						</div>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							Already have an account?{" "}
							<Link href="/sign-in">
								<span className="font-medium text-indigo-600 hover:text-indigo-500">
									Sign in
								</span>
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
