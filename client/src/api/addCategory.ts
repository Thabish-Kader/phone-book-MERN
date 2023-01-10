import { BASE_URL } from "../config";
import { TCategory } from "../typings";

export const addCategory = async (category: string): Promise<TCategory> => {
	const res = await fetch(`${BASE_URL}/category`, {
		method: "POST",
		body: JSON.stringify({ category }),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const newCategory: TCategory = await res.json();
	return newCategory;
};
