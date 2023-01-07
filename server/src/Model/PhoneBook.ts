import mongoose, { isObjectIdOrHexString } from "mongoose";
const { Schema } = mongoose;

const PhoneBook = new Schema({
	category: String,
	contacts: [
		{
			id: Schema.Types.ObjectId,
			name: String,
			description: String,
		},
	],
});

export const PhoneBookModel = mongoose.model("PhoneBook", PhoneBook);
