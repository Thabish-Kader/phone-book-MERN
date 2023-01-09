import express, { Request, Response } from "express";
import { PhoneBookModel } from "../Model/PhoneBook";

const contactRoute = express.Router();

contactRoute.post("/contact", async (req: Request, res: Response) => {
	const { categoryId } = req.params;
	const { contact } = req.body;
	const category = await PhoneBookModel.findById({
		categoryId,
	});
	if (!category) return res.status(404).send("No such category");
	category.contacts.push(contact);
});

export default contactRoute;
