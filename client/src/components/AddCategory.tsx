import React from "react";

export const AddCategory = () => {
	return (
		<div className="">
			<form className="space-x-2 p-10 flex items-center flex-col">
				<img
					className="h-20 w-20 mr-2 -rotate-12"
					src="https://www.svgrepo.com/show/281560/phone-book-notepad.svg"
					alt=""
				/>
				<div className="flex items-center">
					<h1 className="text-2xl text-white my-2 tracking-widest ">
						Contact Book
					</h1>
				</div>
				<div className="text-center space-x-2">
					<input
						type="text"
						placeholder="Add Category"
						className="p-2 rounded-lg outline-none focus:outline-orange-400"
					/>
					<button className="p-2 font-bold bg-orange-400 text-ehite rounded-lg">
						Add Category
					</button>
				</div>
			</form>
		</div>
	);
};
