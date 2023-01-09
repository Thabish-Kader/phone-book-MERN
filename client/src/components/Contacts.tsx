import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import { TCategory } from "../typings";
import { FaUserAlt } from "react-icons/fa";

export const Contacts = () => {
	const [category, setCategory] = useState<TCategory>();
	const [title, setTitle] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const { categoryId } = useParams();

	// Update title
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

	// Add Contact
	const handleAddContact = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await fetch(`${BASE_URL}/category/${categoryId}/contact`, {
			method: "POST",
			body: JSON.stringify({ name, description }),
			headers: {
				"Content-type": "application/json",
			},
		});
		const newCategory = await res.json();
		setCategory(newCategory);
		setName("");
		setDescription("");
	};

	// fecth contact info
	useEffect(() => {
		const fetchCategory = async () => {
			const categoryRes = await fetch(
				`${BASE_URL}/category/${categoryId}`
			).then(async (res) => setCategory(await res.json()));
		};
		fetchCategory();
	}, [categoryId]);
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
				{/* Inputs for adding contacts */}
				<form
					onSubmit={handleAddContact}
					className="grid grid-cols-2 gap-1 items-center "
				>
					<input
						type="text"
						placeholder="Enter Contact name"
						className="inputs border"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Enter Description"
						className="inputs border"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<button disabled={!name} className="btn my-5 col-span-2">
						Add
					</button>
				</form>

				{/* Contact Info */}
				<div className="pt-4 ">
					<div className="flex justify-between text-yellow-500 p-5 border-b first:border-t">
						<p></p>
						<h1 className="capitalize w-32 ml-6 ">Contact name</h1>
						<p className="flex-1 ml-6">Description</p>
					</div>
					{category?.contacts.map((contact) => (
						<div
							key={contact._id}
							className="flex justify-between text-yellow-500 p-5 border-b first:border-t"
						>
							<FaUserAlt size={30} />
							<h1 className="capitalize w-32 mx-3">
								{contact.name}
							</h1>
							<p className="flex-1">{contact.description}</p>
							<button className="px-2 bg-red-500 rounded-lg text-white">
								Delete
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
