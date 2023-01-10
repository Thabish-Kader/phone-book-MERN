import React, { useContext, useState } from "react";
import { Context } from "../App";
import { Contact, TCategory } from "../typings";
// import { Context } from "../main";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
type Props = {
	category: string;
	categoryId: string;
	contacts: Contact[];
};

export const Category = ({ category, categoryId, contacts }: Props) => {
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
		<div className="bg-transparent border p-2 rounded-lg flex flex-col space-y-4">
			<h1 className="font-bold text-2xl text-yellow-500 text-center capitalize">
				{category}
			</h1>
			<div className="flex items-center space-x-2">
				<FaUserAlt className="text-yellow-500" />
				<p className="text-yellow-500">Contacts : {contacts.length}</p>
			</div>
			<form className="flex space-x-2 mt-auto">
				<Link
					to={`/category/${categoryId}`}
					className="p-2 bg-green-500 rounded-lg flex-1 text-center"
				>
					View
				</Link>
				<button
					onClick={handleDeleteCategory}
					className="p-2 bg-red-500 rounded-lg flex-1"
				>
					Delete
				</button>
			</form>
		</div>
	);
};
