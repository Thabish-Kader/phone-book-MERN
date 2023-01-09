import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import { TCategory } from "../typings";

export const Contacts = () => {
	const [category, setCategory] = useState<TCategory>();
	const [title, setTitle] = useState("");
	const { categoryId } = useParams();

	useEffect(() => {
		const fetchCategory = async () => {
			const categoryRes = await fetch(
				`${BASE_URL}/category/${categoryId}`
			).then(async (res) => setCategory(await res.json()));
		};
		fetchCategory();
	}, [categoryId]);

	const handleUpdateTitle = async (e: React.FormEvent) => {
		e.preventDefault();
		const updatedTitleRes = await fetch(
			`${BASE_URL}/category/${categoryId}`,
			{
				method: "PUT",
				body: JSON.stringify({ title }),
				headers: {
					"Content-type": "application/json",
				},
			}
		);
		const newTitle: TCategory = await updatedTitleRes.json();
		setCategory(newTitle);
		setTitle("");
	};

	return (
		<div className="max-w-2xl mx-auto  flex flex-col justify-center items-center">
			<div className="border p-2 text-white mt-10 flex flex-col space-y-2">
				<h1 className="font-bold text-2xl capitalize text-center">
					Category :{" "}
					<span className="text-orange-400">
						{category?.category}
					</span>
				</h1>
				{/* input for changeign title */}
				<div className="flex items-center">
					<input
						type="text"
						placeholder="Change Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="p-2 bg-transparent outline-none text-yellow-400"
					/>
					<button
						disabled={!title}
						onClick={handleUpdateTitle}
						className="p-2 rounded-lg bg-yellow-500 text-black disabled:bg-gray-500"
					>
						Change Title
					</button>
				</div>
			</div>
		</div>
	);
};
