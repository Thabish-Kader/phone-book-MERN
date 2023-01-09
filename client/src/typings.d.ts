export type TCategory = {
	_id: string;
	category: string;
	contacts: Contact[];
};

type Contact = {
	name: string;
	description: string;
	_id: string;
};
