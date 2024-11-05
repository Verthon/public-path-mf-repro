import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";

//@ts-ignore
const Input = React.lazy(() => import("input/Input"));

console.log("input", Input);

export const InputMFLoader = () => {
	return (
		<React.Suspense fallback="loading">
			<ErrorBoundary fallback={<h2>Failed to load Input MF</h2>}>
				<Input />
			</ErrorBoundary>
		</React.Suspense>
	);
};
