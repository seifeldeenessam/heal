import { ReactNode } from 'react';
import './grid.css';

interface IProps {
	children: ReactNode;
}

function Grid({ children }: IProps) {
	return <section id='grid'>{children}</section>;
}

export default Grid;