import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { PhoneBookModel } from "./Model/PhoneBook";
dotenv.config();

const app = express();
app.use(express.json());
const PORT = 5001;

app.post("/category", async (req: Request, res: Response) => {
	const { category } = req.body;
	const newCategory = new PhoneBookModel({
		category: category,
	});
	await newCategory.save();
	res.status(200).json(newCategory);
});

app.get("/", async (req: Request, res: Response) => {
	res.send("hello");
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
	console.log(`Listening ----> ${PORT}`);
	app.listen(PORT);
});
