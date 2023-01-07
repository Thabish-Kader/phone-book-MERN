import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { Category } from "../typings";

export const Categories = () => {
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const fetchCategory = async () => {
			const res = await fetch(`${BASE_URL}/category`);
			const resCategories: Category[] = await res.json();
			setCategories(resCategories);
		};
		fetchCategory();
	}, []);

	return (
		<div className="max-w-4xl mx-auto">
			<div className="grid grid-cols-4 gap-2">
				{categories.map((category, i) => (
					<div
						key={category._id}
						className="bg-gray-200 p-2 rounded-lg"
					>
						<h1>{category.category}</h1>
					</div>
				))}
			</div>
		</div>
	);
};
