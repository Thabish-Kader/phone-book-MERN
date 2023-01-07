import { AddCategory } from "./components/AddCategory";
import { Categories } from "./components/Categories";

function App() {
	return (
		<div className="bg-[#242424] h-screen">
			<AddCategory />
			<Categories />
		</div>
	);
}

export default App;
