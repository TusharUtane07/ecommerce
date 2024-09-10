import Link from "next/link";
import React from "react";

const AdminDashboard = () => {
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
