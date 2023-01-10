import { BASE_URL } from "../config";
import { TCategory } from "../typings";

export const getCategory = async (categoryId: string) => {
	const categoryRes = await fetch(`${BASE_URL}/category/${categoryId}`);
	const category: TCategory = await categoryRes.json();
	return category;
};
