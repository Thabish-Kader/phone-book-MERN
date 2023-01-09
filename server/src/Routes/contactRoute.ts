import express, { Request, Response } from "express";
import { PhoneBookModel } from "../Model/PhoneBook";

const contactRoute = express.Router();

contactRoute.post(
	"/:categoryId/contact",
	async (req: Request, res: Response) => {
		const { categoryId } = req.params;
		const { name, description } = req.body;
		const category = await PhoneBookModel.findByIdAndUpdate(
			{ _id: categoryId },
			{ $push: { contacts: { name, description } } },
			{ new: true }
		);
		res.status(200).json(category);
	}
);

contactRoute.delete(
	"/:categoryId/contact",
	async (req: Request, res: Response) => {
		const { categoryId } = req.params;
		const { contactId } = req.body;

		const deletedContact = await PhoneBookModel.findByIdAndUpdate(
			{ _id: categoryId },
			{ $pull: { contacts: { _id: contactId } } },
			{ safe: true, multi: false, new: true }
		);
		res.status(200).json(deletedContact);
	}
);

export default contactRoute;
