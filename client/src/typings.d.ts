export type TCategory = {
	_id: string;
	category: string;
	contacts: Contact[];
};

export type Contact = {
	name: string;
	description: string;
	number: string;
	_id: string;
};
