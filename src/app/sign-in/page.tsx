"use client";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignIn = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const router = useRouter();

	const signInUser = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const user = await axiosInstance.post("/api/sign-in/", {
				email,
				password,
			});
			const data = await user.data;
			if (data.result) {
				toast.success("Signed in Successfully");
				router.push("/");
			}
		} catch (error: any) {
			toast.error("user not found");
		}
	};

	return (
		<div className="lg:py-40">
			<Link href={"/"}></Link>
			<form>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onClick={signInUser}>Sign In</button>
			</form>
		</div>
	);
};

export default SignIn;
