import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Contacts } from "./components/Contacts";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/category/:categoryId",
		element: <Contacts />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
