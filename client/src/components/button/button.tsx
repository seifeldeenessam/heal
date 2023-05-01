import { ReactNode } from 'react';
import './button.css';

interface IProps {
	type?: "button" | "submit";
	condition: "primary" | "secondary" | "fail" | "success";
	label?: string;
	icon?: ReactNode;
	className?: string;
	action?(): void;
}

function Button({ type = "button", condition, label, icon, className, action }: IProps) {
	return (
		<button className={className ? `${condition} ${className}` : condition} type={type} onClick={action}>{label!}{icon!}</button>
	);
}

export default Button;