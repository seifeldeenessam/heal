import { ReactComponent as LoadingSVG } from './../../assets/svgs/illustrations/loading.svg';
import './loading.css';

interface IProps {
	expanded?: boolean;
}

function Loading({ expanded = true }: IProps) {
	return (
		<div id='loading' className={expanded ? "expanded" : "fitted"}>
			<LoadingSVG />
			<span>Hold on while we load your data...</span>
		</div>
	);
}

export default Loading;