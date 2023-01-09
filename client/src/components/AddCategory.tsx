import React, { useContext, useEffect, useState } from "react";
import { TCategory } from "../typings";
import { BASE_URL } from "../config";
import { Category } from "./Category";
import { Context } from "../main";
// import { Context } from "../App";

export const AddCategory = () => {
	const [category, setCategory] = useState("");
	// const [categories, setCategories] = useState<TCategory[]>([]);
	const { categories, setCategories } = useContext(Context);
	const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await fetch("http://localhost:5001/category", {
			method: "POST",
			body: JSON.stringify({ category }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const newCatrgory = await res.json();
		setCategory("");
		setCategories([...categories!, newCatrgory]);
	};

	useEffect(() => {
		const fetchCategory = async () => {
			const res = await fetch(`${BASE_URL}/category`);
			const resCategories: TCategory[] = await res.json();
			setCategories(resCategories);
		};
		fetchCategory();
	}, []);

	return (
		<div className="max-w-4xl mx-auto">
			<form
				onSubmit={handleAddCategory}
				className="space-x-2 p-10 flex items-center flex-col"
			>
				<img
					className="h-20 w-20 mr-2 -rotate-12"
					src="https://www.svgrepo.com/show/281560/phone-book-notepad.svg"
					alt=""
				/>

				<h1 className="text-2xl text-white my-2 tracking-widest text-center">
					Contact Book
				</h1>

				<div className="text-center space-x-2">
					<input
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						type="text"
						placeholder="Add Category"
						className="p-2 rounded-lg outline-none focus:outline-orange-400"
					/>
					<button className="p-2 font-bold bg-orange-400 text-ehite rounded-lg">
						Add Category
					</button>
				</div>
			</form>
			<div className="grid grid-cols-4 gap-2 ">
				{categories?.map((category) => (
					<>
						<Category
							key={category._id}
							categoryId={category._id}
							category={category.category}
						/>
					</>
				))}
			</div>
		</div>
	);
};
