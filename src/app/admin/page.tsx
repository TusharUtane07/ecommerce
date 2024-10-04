"use client";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);
	const [user, setUser] = useState("not-user"); // change this later according to user details
	const router = useRouter();
	useEffect(() => {
		if (isAuthenticated) {
			if (user === "user") {
				toast.success("Welcome Admin");
			} else {
				toast.error("This page is for Admin only admins can sign-in");
				router.push("/sign-in");
			}
		} else {
			toast.success("This page is for Admin only admins can sign-in");
			router.push("/sign-in");
		}
	}, [isAuthenticated]);
	return (
		<div className="flex flex-col h-screen items-center justify-center">
			<h1 className="font-bold text-4xl capitalize my-5">Welcome, tushar</h1>
			<div className="font-semibold text-2xl ">
				<div className="bg-indigo-500 text-white px-5 py-2 my-3 rounded-full">
					<Link href={"/admin/add-products"}>Add Products</Link>
				</div>
				<div className="bg-indigo-500 text-white px-5 py-2 my-3 rounded-full">
					<Link href={"/admin/show-products"}>Show Products</Link>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
