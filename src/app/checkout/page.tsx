"use client";
import React, { useEffect, useState } from "react";
type LocationData = {
	[country: string]: string[];
};

const locationData: LocationData = {
	"United States": [
		"New York",
		"Los Angeles",
		"Chicago",
		"Houston",
		"Phoenix",
		"Philadelphia",
		"San Antonio",
		"San Diego",
		"Dallas",
		"San Jose",
	],
	Australia: [
		"Sydney",
		"Melbourne",
		"Brisbane",
		"Perth",
		"Adelaide",
		"Gold Coast",
		"Canberra",
		"Hobart",
		"Darwin",
		"Newcastle",
	],
	France: [
		"Paris",
		"Marseille",
		"Lyon",
		"Toulouse",
		"Nice",
		"Nantes",
		"Strasbourg",
		"Montpellier",
		"Bordeaux",
		"Lille",
	],
	India: [
		"Mumbai",
		"Delhi",
		"Bangalore",
		"Hyderabad",
		"Ahmedabad",
		"Chennai",
		"Kolkata",
		"Surat",
		"Pune",
		"Jaipur",
	],
	"United Kingdom": [
		"London",
		"Manchester",
		"Birmingham",
		"Liverpool",
		"Leeds",
		"Glasgow",
		"Edinburgh",
		"Sheffield",
		"Bristol",
		"Cardiff",
	],
	Canada: [
		"Toronto",
		"Vancouver",
		"Montreal",
		"Calgary",
		"Edmonton",
		"Ottawa",
		"Quebec City",
		"Winnipeg",
		"Hamilton",
		"Victoria",
	],
	Germany: [
		"Berlin",
		"Munich",
		"Hamburg",
		"Cologne",
		"Frankfurt",
		"Stuttgart",
		"Düsseldorf",
		"Dortmund",
		"Essen",
		"Leipzig",
	],
	Japan: [
		"Tokyo",
		"Osaka",
		"Yokohama",
		"Nagoya",
		"Sapporo",
		"Fukuoka",
		"Kobe",
		"Kyoto",
		"Sendai",
		"Hiroshima",
	],
	China: [
		"Beijing",
		"Shanghai",
		"Shenzhen",
		"Guangzhou",
		"Chengdu",
		"Chongqing",
		"Tianjin",
		"Hangzhou",
		"Wuhan",
		"Nanjing",
	],
	Brazil: [
		"São Paulo",
		"Rio de Janeiro",
		"Brasília",
		"Salvador",
		"Fortaleza",
		"Belo Horizonte",
		"Manaus",
		"Curitiba",
		"Recife",
		"Porto Alegre",
	],
};

const Checkout = () => {
	const [selectedCountry, setSelectedCountry] =
		useState<string>("United States");
	const [cities, setCities] = useState<string[]>(locationData[selectedCountry]);
	const [selectedCity, setSelectedCity] = useState<string>(cities[0]);

	const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const country = e.target.value;
		setSelectedCountry(country);
		setCities(locationData[country]);
		setSelectedCity(locationData[country][0]);
	};

	const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCity(e.target.value);
	};

	useEffect(() => {
		setSelectedCity(cities[0]);
	}, [cities]);

	return (
		<section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
			<form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
				<div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
					<div className="min-w-0 flex-1 space-y-8">
						<h1 className="text-4xl font-medium capitalize ">
							Checkout details
						</h1>
						<div className="space-y-4">
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
								Delivery Details
							</h2>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div>
									<label
										htmlFor="your_name"
										className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
										{" "}
										Your name{" "}
									</label>
									<input
										type="text"
										id="your_name"
										className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
										placeholder="Tushar Utane"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="your_email"
										className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
										{" "}
										Your email{" "}
									</label>
									<input
										type="email"
										id="your_email"
										className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
										placeholder="tusharutane7556@gmail.com"
										required
									/>
								</div>
								<div>
									<div className="mb-2 flex items-center gap-2">
										<label
											htmlFor="select-country-input-3"
											className="block text-sm font-medium text-gray-900 dark:text-white">
											{" "}
											Country{" "}
										</label>
									</div>
									<select
										value={selectedCountry}
										onChange={handleCountryChange}
										id="select-country-input-3"
										className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
										{Object.keys(locationData).map((country) => (
											<option key={country} value={country}>
												{country}
											</option>
										))}
									</select>
								</div>
								<div>
									<div className="mb-2 flex items-center gap-2">
										<label
											htmlFor="select-city-input-3"
											className="block text-sm font-medium text-gray-900 dark:text-white">
											{" "}
											City{" "}
										</label>
									</div>
									<select
										value={selectedCity}
										onChange={handleCityChange}
										id="select-city-input-3"
										className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
										{cities.map((city) => (
											<option key={city} value={city}>
												{city}
											</option>
										))}
									</select>
								</div>
								<div>
									<label
										htmlFor="phone-input-3"
										className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
										{" "}
										Phone Number{" "}
									</label>
									<div className="flex items-center">
										<div className="relative w-full">
											<input
												type="text"
												id="phone-input"
												className="z-20 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
												placeholder="+91-7387927556"
												required
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="space-y-4">
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
								Payment
							</h3>
							<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
								<div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
									<div className="flex items-start">
										<div className="flex h-5 items-center">
											<input
												id="credit-card"
												aria-describedby="credit-card-text"
												type="radio"
												name="payment-method"
												className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
												defaultChecked
											/>
										</div>
										<div className="ms-4 text-sm">
											<label
												htmlFor="credit-card"
												className="font-medium leading-none text-gray-900 dark:text-white">
												{" "}
												Credit Card{" "}
											</label>
											<p
												id="credit-card-text"
												className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
												Pay with your credit card
											</p>
										</div>
									</div>
								</div>
								<div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
									<div className="flex items-start">
										<div className="flex h-5 items-center">
											<input
												id="pay-on-delivery"
												aria-describedby="pay-on-delivery-text"
												type="radio"
												name="payment-method"
												className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
											/>
										</div>
										<div className="ms-4 text-sm">
											<label
												htmlFor="pay-on-delivery"
												className="font-medium leading-none text-gray-900 dark:text-white">
												{" "}
												Payment on delivery{" "}
											</label>
											<p
												id="pay-on-delivery-text"
												className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
												+$15 payment processing fee
											</p>
										</div>
									</div>
								</div>
								<div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
									<div className="flex items-start">
										<div className="flex h-5 items-center">
											<input
												id="upi"
												type="radio"
												name="payment-method"
												className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
											/>
										</div>
										<div className="ms-4 text-sm">
											<label
												htmlFor="upi"
												className="font-medium leading-none text-gray-900 dark:text-white">
												{" "}
												Pay with UPI{" "}
											</label>
											<p
												id="paypal-text"
												className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
												For Indian customer
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
						<div className="flow-root">
							<div className="-my-3 border-2 px-3 rounded-md border-gray-200 p-1 divide-y divide-gray-200 dark:divide-gray-800">
								<dl className="flex items-center justify-between gap-4 py-3">
									<dt className="text-base font-bold text-gray-900 dark:text-white">
										Total
									</dt>
									<dd className="text-base font-bold text-gray-900 dark:text-white">
										$8,392.00
									</dd>
								</dl>
							</div>
						</div>
						<div>
							<button className="bg-indigo-600 px-5 py-3 rounded-md text-white w-full font-medium">
								Confirm Order
							</button>
						</div>
					</div>
				</div>
			</form>
		</section>
	);
};

export default Checkout;
