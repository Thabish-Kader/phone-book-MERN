import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { PhoneBookModel } from "./Model/PhoneBook";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
const PORT = 5001;
app.use(cors());

app.route("/category")
	.get(async (req: Request, res: Response) => {
		const { category } = req.body;
		const newCategory = new PhoneBookModel({
			category: category,
		});
		await newCategory.save();
		res.status(200).json(newCategory);
	})
	.post(async (req: Request, res: Response) => {
		const { category } = req.body;
		const newCategory = new PhoneBookModel({
			category: category,
		});
		await newCategory.save();
		res.status(200).json(newCategory);
	});

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL!, () => {
	console.log(`Connected ----> ${PORT}`);
	app.listen(PORT);
});

//handle error
mongoose.connection.on("error", (err) =>
	console.log("Connection failed with - ", err)
);

app.get("/", async (req: Request, res: Response) => {
	res.send("Hello");
});
