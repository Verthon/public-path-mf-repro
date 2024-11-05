import { createRoot } from "react-dom/client";

import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./AppRouter";

const render = () => {
	const container = document.getElementById("root");
	if (container) {
		const root = createRoot(container);
		root.render(
			<StrictMode>
				<RouterProvider router={AppRouter} />
			</StrictMode>
		);
	}
};

render();
