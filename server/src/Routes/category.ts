import express, { Request, Response } from "express";
import { PhoneBookModel } from "../Model/PhoneBook";

const categoryRoutes = express.Router();

categoryRoutes.get("/", async (req: Request, res: Response) => {
	const newCategory = await PhoneBookModel.find();
	res.json(newCategory);
});

categoryRoutes.post("/", async (req: Request, res: Response) => {
	const { category } = req.body;
	const newCategory = new PhoneBookModel({
		category: category,
	});
	await newCategory.save();
	res.status(200).json(newCategory);
});

categoryRoutes.delete("/", async (req: Request, res: Response) => {
	const { categoryId } = req.body;

	const deletedCategory = await PhoneBookModel.findByIdAndDelete(categoryId);
	res.status(200).json(deletedCategory);
});

export default categoryRoutes;
