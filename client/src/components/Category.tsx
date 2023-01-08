import React from "react";

type Props = {
	category: string;
};
export const Category = ({ category }: Props) => {
	return (
		<div className="bg-gray-200 p-2 rounded-lg">
			<h1>{category}</h1>
		</div>
	);
};
