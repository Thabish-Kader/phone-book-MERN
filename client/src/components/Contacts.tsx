import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import { TCategory } from "../typings";
import { FaUserAlt } from "react-icons/fa";

export const Contacts = () => {
	const [category, setCategory] = useState<TCategory>();
	const [title, setTitle] = useState("");
	// Contact info state
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [number, setNumber] = useState("");
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
			body: JSON.stringify({ name, description, number }),
			headers: {
				"Content-type": "application/json",
			},
		});
		const newCategory = await res.json();
		setCategory(newCategory);
		setName("");
		setDescription("");
		setNumber("");
	};

	const handleDeleteContact = async (contactId: string) => {
		const res = await fetch(`${BASE_URL}/category/${categoryId}/contact`, {
			method: "DELETE",
			body: JSON.stringify({ contactId }),
			headers: {
				"Content-type": "application/json",
			},
		});
		const deletedContact = await res.json();
		setCategory(deletedContact);
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
		<div className="max-w-4xl mx-auto  flex flex-col justify-center ">
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
						className="inputs flex-1"
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
			<div className=" mt-10 flex flex-col space-y-2">
				{/* Inputs for adding contacts */}
				<form
					onSubmit={handleAddContact}
					className="flex flex-col  space-y-4"
				>
					<div className="grid grid-cols-2">
						<input
							type="text"
							placeholder="Enter Contact name"
							className="inputs border"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type="text"
							placeholder="Enter Phone Number"
							className="inputs border"
							value={number}
							onChange={(e) => setNumber(e.target.value)}
						/>
					</div>
					<input
						type="text"
						placeholder="Enter Description"
						className="inputs border"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<button
						disabled={!name || !number}
						className="btn my-5 col-span-2"
					>
						Add
					</button>
				</form>

				{/* Contact Info */}
				<div className="pt-4 ">
					<div className="flex justify-between text-yellow-500 p-5 border-b first:border-t">
						<p className="capitalize w-32 ml-6 ">Contact name</p>
						<p className="flex-1 ml-6">Description</p>
						<p className="flex-1 -ml-12">Phone Number</p>
						<p></p>
					</div>
					{category?.contacts.map((contact) => (
						<div
							key={contact._id}
							className="flex justify-between text-yellow-500 p-5 border-b first:border-t space-x-3"
						>
							<FaUserAlt size={30} />
							<h1 className="capitalize w-32 mx-3">
								{contact.name}
							</h1>
							<p className="flex-1">{contact.description}</p>
							<p className="flex-1">{contact.number}</p>
							<button
								onClick={() => handleDeleteContact(contact._id)}
								className="px-2 bg-red-500 rounded-lg text-white"
							>
								Delete
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
