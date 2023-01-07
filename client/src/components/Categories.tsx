import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

export const Categories = () => {
	const [categories, setCategories] = useState();

	useEffect(() => {
		const fetchCategory = async () => {
			const res = await fetch(`${BASE_URL}/category`);
			const resCategories = await res.json();
			setCategories(resCategories);
		};
		fetchCategory();
	}, []);
	console.log(categories);
	return <div>Categories</div>;
};
