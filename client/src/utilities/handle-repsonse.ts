import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import IMessage from "../interfaces/message";

interface IProps {
	setMessage: Dispatch<React.SetStateAction<IMessage>>;
	response: IMessage;
	navigate: NavigateFunction;
}

export default function handleResponse({ setMessage, response, navigate }: IProps): void {
	setMessage(response);
	if (response.succeed) setTimeout(() => {
		navigate('/', { replace: true });
		window.location.reload();
	}, 1000);
};