import { ReactNode } from "react";
import './main.css';

interface IProps {
	children: ReactNode;
}

function Main({ children }: IProps) {
	return (
		<main>{children}</main>
	);
}

export default Main;