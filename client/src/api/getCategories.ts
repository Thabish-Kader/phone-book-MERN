import { BASE_URL } from "../config";
import { TCategory } from "../typings";

export const getCategories = async () => {
	const res = await fetch(`${BASE_URL}/category`);
	const resCategories: TCategory[] = await res.json();
	return resCategories;
};
