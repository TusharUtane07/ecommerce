"use client";
import Loader from "@/components/Loader";
import axiosInstance from "@/lib/axios";
import { ProductT } from "@/models/Product";
import CtaOne from "@/sections/Cta";
import CtaMail from "@/sections/CtaMail";
import Hero from "@/sections/Hero";
import Popular from "@/sections/Popular";
import SaleProduct from "@/sections/SaleProduct";
import Testimonials from "@/sections/Testimonials";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Home = () => {
	const [products, setProducts] = useState<ProductT[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [popular, setPopular] = useState<ProductT[] | null>(null);
	const [topRated, setTopRated] = useState<ProductT[] | null>(null);

	const fetchProducts = async () => {
		try {
			const response = await axiosInstance.get("/api/products");
			const data = response.data;

			if (data.result) {
				setProducts(data?.products || []);
				const popularProducts = data?.products.filter(
					(item: ProductT) => item.category === "popular"
				);

				const topRatedProducts = data?.products.filter(
					(item: ProductT) => item.category === "featured"
				);

				setPopular(popularProducts);
				setTopRated(topRatedProducts);
			} else {
				toast.error(data.message || "Facing some internal server issue");
			}
		} catch (error: any) {
			toast.error(error?.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<div>
			<Hero />
			<CtaOne
				heading={"Highlights"}
				subheading={"Nike air with limitless choices"}
				paragraph={
					"Our purpose is to move the world forward. We take action by building community, protecting our planet, and increasing sport. Through innovative design and sustainable practices, we craft footwear that fuels your every step."
				}
				buttonText={"explore more"}
				img={"/assets/sections/nike-air-1.png"}
			/>
			<Popular heading="Popular Sales" products={popular} />
			<CtaOne
				heading={"featured"}
				subheading={"nike sneakers air lancing shoes"}
				paragraph={
					"The radiance lives on Nike Sneakers Air Lancing Shoes, The basket ball OG that puts a fresh spin on what you know best durably stiched overlays, clean finishes and the perfect amount of flash to make you shine."
				}
				buttonText={"explore more"}
				img={"/assets/sections/nike-air-4.png"}
			/>
			<Popular heading="Top Rated Products" products={topRated} />
			<SaleProduct
				heading="Sale"
				subheading="Get this amazing sneaker before time"
				paragraph="Our purpose is to move the world forward. We take action by building community, protecting our planet, and increasing sport. Through innovative design and sustainable practices, we craft footwear that fuels your every step."
				img="/assets/sections/nike-air-3.png"
				buttonText="Explore More"
			/>
			<Testimonials />
			<CtaMail />
		</div>
	);
};

export default Home;
