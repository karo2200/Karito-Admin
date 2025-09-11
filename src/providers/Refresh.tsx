import config from 'config';
import { gql } from 'graphql-request';
import { GraphQLClient } from 'graphql-request';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/utils/constants';
import { getCookieStorage, saveCookie } from '@/utils/storage/cookie';

const REFRESH_TOKEN_MUTATION = gql`
	mutation auth_refreshToken($input: Auth_RefreshTokenInput!) {
		auth_refreshToken(input: $input) {
			result {
				accessToken
				refreshToken
			}
		}
	}
`;
export const graphQLClient = new GraphQLClient(config.API_URL as string);

export async function refreshTokenManually(): Promise<string | null> {
	const accessToken = getCookieStorage(ACCESS_TOKEN_KEY);
	const refreshToken = getCookieStorage(REFRESH_TOKEN_KEY);

	console.log('[Refresh] Current tokens:', { accessToken, refreshToken });

	if (!accessToken || !refreshToken) {
		console.warn('[Refresh] No token available to refresh');
		return null;
	}

	try {
		const res = await graphQLClient.request(REFRESH_TOKEN_MUTATION, {
			input: {
				accessToken,
				refreshToken,
			},
		});

		console.log('[Refresh] Mutation result:', res);

		const newAccessToken = res?.auth_refreshToken?.result?.accessToken;
		const newRefreshToken = res?.auth_refreshToken?.result?.refreshToken;

		if (newAccessToken) {
			saveCookie(ACCESS_TOKEN_KEY, newAccessToken);
			saveCookie(REFRESH_TOKEN_KEY, newRefreshToken || '');
			graphQLClient.setHeader('Authorization', 'Bearer ' + newAccessToken);
			return newAccessToken;
		} else {
			console.warn('[Refresh] No new accessToken returned');
		}
	} catch (err) {
		console.error('[Refresh] Failed to refresh token:', err);
	}

	return null;
}
