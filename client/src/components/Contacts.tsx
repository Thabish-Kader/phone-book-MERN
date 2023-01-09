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
						className="inputs"
					/>
					<button
						disabled={!title}
						onClick={handleUpdateTitle}
						className="btn"
					>
						Change Title
					</button>
				</div>
			</div>
			{/* Contacts */}
			<div className="max-w-2xl mx-auto mt-10 flex flex-col space-y-2">
				<div className="grid grid-cols-2 gap-1 items-center ">
					<input
						type="text"
						placeholder="Enter Contact name"
						className="inputs border"
					/>
					<input
						type="text"
						placeholder="Enter Description"
						className="inputs border"
					/>
				</div>
				<button className="btn">Add</button>
			</div>
		</div>
	);
};
