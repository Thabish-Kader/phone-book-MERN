import React, { useContext, useState } from "react";
// import { Context } from "../App";
import { TCategory } from "../typings";
import { Context } from "../main";

type Props = {
	category: string;
	categoryId: string;
};
export const Category = ({ category, categoryId }: Props) => {
	const { categories, setCategories } = useContext(Context);

	const handleDeleteCategory = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await fetch("http://localhost:5001/category", {
			method: "DELETE",
			body: JSON.stringify({ categoryId }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const deletedCategory = await res.json();
		setCategories(
			categories?.filter(
				(category) => category._id !== deletedCategory._id
			) as TCategory[]
		);
	};

	return (
		<div className="bg-gray-200 p-2 rounded-lg">
			<div className="flex flex-col justify-center">
				<h1 className="font-bold text-2xl text-center capitalize">
					{category}
				</h1>
				<form
					onSubmit={handleDeleteCategory}
					className="flex space-x-2"
				>
					<button className="p-2 bg-yellow-500 rounded-lg flex-1">
						Update
					</button>
					<button className="p-2 bg-red-500 rounded-lg flex-1">
						Delete
					</button>
				</form>
			</div>
		</div>
	);
};
