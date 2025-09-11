import config from 'config';
import { GraphQLClient } from 'graphql-request';
import jwtDecode from 'jwt-decode';

import { refreshTokenManually } from '@/providers/Refresh';
import { ACCESS_TOKEN_KEY } from '@/utils/constants';
import { getCookieStorage } from '@/utils/storage/cookie';

export const graphQLClient = new GraphQLClient(config.API_URL as string);

export function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
	return async (): Promise<TData> => {
		const token = await getCookieStorage(ACCESS_TOKEN_KEY);
		// Set header only if token exists and is valid
		if (token && !isTokenExpired(token)) {
			graphQLClient.setHeader('Authorization', 'Bearer ' + token);
		} else if (isTokenExpired(token)) {
			//const { RefreshToken } = useAuth();
			//RefreshToken();
			refreshTokenManually();
		} else {
			// Remove token header if expired or not present
			graphQLClient.setHeaders({});
		}

		return await graphQLClient.request(query, variables);
	};
}

export const isTokenExpired = (token: string | null): boolean => {
	if (!token) return true;

	try {
		const decoded = jwtDecode<{ exp: number }>(token);
		return decoded.exp < Date.now() / 1000;
	} catch {
		return true;
	}
};
