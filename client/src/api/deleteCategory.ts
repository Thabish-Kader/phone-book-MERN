import { BASE_URL } from "../config";
import { TCategory } from "../typings";

export const deleteCategory = async (
	categoryId: string
): Promise<TCategory> => {
	const res = await fetch("http://localhost:5001/category", {
		method: "DELETE",
		body: JSON.stringify({ categoryId }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const deletedCategory: TCategory = await res.json();
	return deletedCategory;
};
