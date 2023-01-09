import React, { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TCategory } from "./typings";
import { BASE_URL } from "./config";

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

interface Props {
	children: React.ReactNode;
}

const CategoriesProvider = ({ children }: Props) => {
	const [categories, setCategories] = useState<TCategory[]>([]);
	useEffect(() => {
		const fetchCategory = async () => {
			const res = await fetch(`${BASE_URL}/category`);
			const resCategories: TCategory[] = await res.json();
			setCategories(resCategories);
		};
		fetchCategory();
	}, []);

	return (
		<Context.Provider value={{ categories, setCategories }}>
			{children}
		</Context.Provider>
	);
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<CategoriesProvider>
			<App />
		</CategoriesProvider>
	</React.StrictMode>
);
