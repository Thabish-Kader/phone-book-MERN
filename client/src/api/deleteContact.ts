import { BASE_URL } from "../config";
import { TCategory } from "../typings";

export const deleteContact = async (
	categoryId: string,
	contactId: string
): Promise<TCategory> => {
	const res = await fetch(`${BASE_URL}/category/${categoryId}/contact`, {
		method: "DELETE",
		body: JSON.stringify({ contactId }),
		headers: {
			"Content-type": "application/json",
		},
	});
	const deletedContact = await res.json();
	return deletedContact;
};
