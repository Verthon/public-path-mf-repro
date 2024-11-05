import { Link } from "react-router-dom";
import "./App.css";

export const App = () => {
	return (
		<div className="container">
			<p>Hello World</p>
			<Link to="/example">example</Link>
		</div>
	);
};
