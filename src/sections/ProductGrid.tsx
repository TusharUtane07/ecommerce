import Link from "next/link";
import { useEffect, useState } from "react";

const ProductsGrid = ({ products, resetPage, setResetPage }: any) => {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12;

	useEffect(() => {
		if (resetPage) {
			setCurrentPage(1);
			setResetPage(false);
		}
	}, [resetPage, setResetPage]);

	const totalPages = Math.ceil(products.length / itemsPerPage);

	const currentProducts = products.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const handlePageChange = (page: any) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
				{currentProducts.map((item: any) => {
					return (
						<Link
							key={String(item._id)}
							href={`/products/${item._id}`}
							className="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto border-2 border-black/20 p-2 rounded-2xl bg-white transition-all duration-500">
							<div>
								<img
									src={item.imageUrl}
									alt={item.name}
									className="w-full aspect-square rounded-2xl hover:scale-105 duration-200 object-cover"
								/>
							</div>
							<div className="mt-5 mx-2">
								<div className="flex items-center justify-between">
									<h6 className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
										{item.name}
									</h6>
									<h6 className="font-semibold text-xl group-hover:text-indigo-600">
										₹ {item.price}
									</h6>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
			<div className="mt-8 flex justify-center space-x-4 font-medium">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className={`px-4 py-2 border rounded-lg transition-all duration-300 ${
						currentPage === 1
							? "bg-gray-300 text-gray-500 cursor-not-allowed"
							: "bg-gray-200 text-black hover:bg-indigo-600 hover:text-white"
					}`}>
					Previous
				</button>

				{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
					<button
						key={page}
						onClick={() => handlePageChange(page)}
						className={`px-4 py-2 border rounded-lg transition-all duration-300 ${
							currentPage === page
								? "bg-indigo-600 text-white"
								: "bg-gray-200 text-black hover:bg-indigo-600 hover:text-white"
						}`}>
						{page}
					</button>
				))}
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className={`px-4 py-2 border rounded-lg transition-all duration-300 ${
						currentPage === totalPages
							? "bg-gray-300 text-gray-500 cursor-not-allowed"
							: "bg-gray-200 text-black hover:bg-indigo-600 hover:text-white"
					}`}>
					Next
				</button>
			</div>
		</>
	);
};

export default ProductsGrid;
