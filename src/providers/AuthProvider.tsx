import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {
	useAuth_RefreshTokenMutation,
	useAuth_VerifyOtpMutation,
	User_GetMyProfileDocument,
	UserType,
	useUser_GetMyProfileQuery,
} from 'src/graphql/generated';

import { fetcher } from '@/graphql/fetcher';
import { graphQLClient } from '@/graphql/fetcher';
import { ACCESS_TOKEN_KEY, queryKeys, REFRESH_TOKEN_KEY } from '@/utils/constants';
import { clearCookie, getCookieStorage, saveCookie } from '@/utils/storage/cookie';

const initialState = {
	isLoading: null,
	isInitialized: false,
	isAuthenticated: false,
};

const authReducer = (state, action) => {
	switch (action.type) {
		case 'INITIALIZE':
			return {
				...state,
				isLoading: null,
				isAuthenticated: action.payload.isAuthenticated,
				isInitialized: true,
			};
		case 'IS_LOADING':
			return {
				...state,
				isLoading: action.payload.isLoading,
			};
		default:
			return state;
	}
};

const AuthContext = createContext({
	...initialState,
	logout: () => Promise.resolve(),
	signInWithEmail: (mobil, code) => Promise.resolve(),
	RefreshToken: () => Promise.resolve(),
});

export default function AuthProvider({ children }) {
	const { data } = useUser_GetMyProfileQuery({}, { retry: false });
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const [state, dispatch] = useReducer(authReducer, initialState);
	const router = useRouter();

	const { mutate: mutateLogin } = useAuth_VerifyOtpMutation();
	const { mutate: mutateRefresh } = useAuth_RefreshTokenMutation();

	// ✅ LOGOUT function
	const logout = async () => {
		dispatch({ type: 'IS_LOADING', payload: { isLoading: 'SIGN_OUT' } });

		try {
			queryClient.clear();
			clearCookie(ACCESS_TOKEN_KEY);
			clearCookie(REFRESH_TOKEN_KEY);

			enqueueSnackbar('Logged out successfully', { variant: 'info' });
			dispatch({ type: 'INITIALIZE', payload: { isAuthenticated: false } });

			if (router.pathname !== '/login' && router.pathname != '/Landing') {
				router.push('/login');
			}
		} catch (error) {
			console.error('[Logout Error]', error);
		} finally {
			dispatch({ type: 'IS_LOADING', payload: { isLoading: null } });
		}
	};

	// ✅ REFRESH TOKEN function
	const RefreshToken = async () => {
		const accessToken = getCookieStorage(ACCESS_TOKEN_KEY);
		const refreshToken = getCookieStorage(REFRESH_TOKEN_KEY);

		if (!accessToken || !refreshToken) {
			await logout();
			return;
		}

		await mutateRefresh(
			{ input: { accessToken, refreshToken } },
			{
				onSuccess: async (res) => {
					const newAccess = res?.auth_refreshToken?.result?.accessToken;
					const newRefresh = res?.auth_refreshToken?.result?.refreshToken;

					if (newAccess) {
						saveCookie(ACCESS_TOKEN_KEY, newAccess);
						saveCookie(REFRESH_TOKEN_KEY, newRefresh || '');
						graphQLClient.setHeader('Authorization', 'Bearer ' + newAccess);

						dispatch({ type: 'INITIALIZE', payload: { isAuthenticated: true } });
					} else {
						await logout();
					}
				},
				onError: async () => {
					await logout();
				},
			}
		);
	};

	// ✅ INITIALIZE function
	useEffect(() => {
		const initialize = async () => {
			const token = getCookieStorage(ACCESS_TOKEN_KEY);

			if (token) {
				graphQLClient.setHeader('Authorization', 'Bearer ' + token);

				try {
					await queryClient.prefetchQuery({
						queryKey: [queryKeys.user_getCurrentUser],
						queryFn: fetcher(User_GetMyProfileDocument),
					});

					if (!data?.user_getMyProfile?.result) {
						await RefreshToken();
					} else {
						dispatch({ type: 'INITIALIZE', payload: { isAuthenticated: true } });

						if (router.pathname === '/login' || router.pathname === '/signup') {
							router.push('/Admin');
						}
					}
				} catch (error) {
					console.error('[Init] Failed to get profile:', error);
					await RefreshToken();
				}
			} else {
				await logout();
			}
		};

		initialize();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// ✅ SIGN-IN function
	const signInWithEmail = async (mobil, code) => {
		dispatch({ type: 'IS_LOADING', payload: { isLoading: 'SIGN_IN_WITH_EMAIL' } });

		return new Promise<void>((resolve, reject) => {
			mutateLogin(
				{
					input: {
						phoneNumber: mobil,
						userType: UserType.Admin,
						otp: code,
					},
				},
				{
					onSuccess: (res) => {
						if (res?.auth_verifyOtp?.status.message === 'Success') {
							const access = res?.auth_verifyOtp?.result?.accessToken;
							const refresh = res?.auth_verifyOtp?.result?.refreshToken;

							if (access) {
								saveCookie(ACCESS_TOKEN_KEY, access);
								saveCookie(REFRESH_TOKEN_KEY, refresh || '');
								graphQLClient.setHeader('Authorization', 'Bearer ' + access);

								dispatch({ type: 'INITIALIZE', payload: { isAuthenticated: true } });
								enqueueSnackbar('Login successful', { variant: 'success' });
								router.push('/Admin');
								resolve();
							} else {
								enqueueSnackbar('توکن دریافت نشد', { variant: 'error' });
								reject();
							}
						} else {
							enqueueSnackbar('کد اشتباه است', { variant: 'error' });
							reject();
						}
					},
					onError: (err) => {
						console.error('[Login Error]', err);
						enqueueSnackbar('خطا در ورود', { variant: 'error' });
						reject();
					},
				}
			);
		}).finally(() => {
			dispatch({ type: 'IS_LOADING', payload: { isLoading: null } });
		});
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				logout,
				signInWithEmail,
				RefreshToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
