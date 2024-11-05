import {
	Outlet,
	Route,
	createRoutesFromElements,
	createBrowserRouter,
} from "react-router-dom";

import { App } from "./App";
import { Example } from "./Example";
import { Layout } from "./Layout";

export const AppRouter = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route
				element={
					<Layout>
						<Outlet />
					</Layout>
				}
			>
				<Route path="/" element={<App />} />
				<Route path="/example" element={<Example />} />
			</Route>
			<Route path="*" element={<div>Not Found page</div>} />
		</Route>
	)
);
