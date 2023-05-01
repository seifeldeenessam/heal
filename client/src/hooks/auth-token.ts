import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import Token from '../interfaces/token';

function useAuthToken() {
	const [cookies] = useCookies(["auth_token"]);
	const [decodedToken, setDecodedToken] = useState<Token | undefined>(undefined);

	useEffect(() => {
		async function getAuthToken(): Promise<void> {
			if (cookies['auth_token']) {
				const decoded: Token = await jwtDecode(cookies["auth_token"]);
				setDecodedToken(decoded);
			} else {
				setDecodedToken(undefined);
			}
		}

		getAuthToken();
	}, [cookies]);

	return decodedToken;
}

export default useAuthToken;