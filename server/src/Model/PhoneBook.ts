import mongoose from "mongoose";
const { Schema } = mongoose;

const PhoneBook = new Schema({
	category: String,
	contacts: [
		{
			name: String,
			description: String,
			number: Number,
		},
	],
});

export const PhoneBookModel = mongoose.model("PhoneBook", PhoneBook);
