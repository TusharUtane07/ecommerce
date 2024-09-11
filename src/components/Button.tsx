import React from "react";

const Button = ({ btnText }: { btnText: string }) => {
	return (
		<button className="bg-black text-white px-5 py-1.5 my-2 rounded-md shadow-md text-sm w-40 font-bold capitalize">
			{btnText}
		</button>
	);
};

export default Button;
