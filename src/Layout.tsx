import { type PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
	return (
		<main>
			<header>Header</header>
			<div>{children}</div>
			<footer>Footer</footer>
		</main>
	);
};
