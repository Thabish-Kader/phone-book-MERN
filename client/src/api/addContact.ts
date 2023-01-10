import { BASE_URL } from "../config";
import { TCategory } from "../typings";

export const addContact = async (
	categoryId: string,
	name: string,
	description: string,
	number: string
): Promise<TCategory> => {
	const res = await fetch(`${BASE_URL}/category/${categoryId}/contact`, {
		method: "POST",
		body: JSON.stringify({ name, description, number }),
		headers: {
			"Content-type": "application/json",
		},
	});
	const newCategory = await res.json();
	return newCategory;
};
