import { createContext, useEffect, useState } from "react";
import { AddCategory } from "./components/AddCategory";
import { TCategory } from "./typings";
import { BASE_URL } from "./config";
import { getCategories } from "./api/getCategories";

type CategoryContextType = {
	categories: TCategory[] | null;
	setCategories: React.Dispatch<React.SetStateAction<TCategory[]>>;
};

const iCategoryContextState = {
	categories: null,
	setCategories: () => {},
};

export const Context = createContext<CategoryContextType>(
	iCategoryContextState
);
function App() {
	const [categories, setCategories] = useState<TCategory[]>([]);
	useEffect(() => {
		const fetchCategory = async () => {
			const resCategories = await getCategories();
			setCategories(resCategories);
		};
		fetchCategory();
	}, []);

	return (
		<div className=" h-screen">
			<Context.Provider value={{ categories, setCategories }}>
				<AddCategory />
			</Context.Provider>
			{/* <Categories /> */}
		</div>
	);
}

export default App;
