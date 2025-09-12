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
				isLoading: action.payload.isLoading,
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
	const { data } = useUser_GetMyProfileQuery();

	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const [state, dispatch] = useReducer(authReducer, initialState);
	const router = useRouter();
	const { mutate: mutateLogin } = useAuth_VerifyOtpMutation();
	const { mutate: mutateRefresh, isLoading: isLoadingRefresh } = useAuth_RefreshTokenMutation();

	useEffect(() => {
		async function initialize() {
			const token = getCookieStorage(ACCESS_TOKEN_KEY);
			if (token) {
				console.log(token);
				await queryClient.prefetchQuery([queryKeys.user_getCurrentUser], () => fetcher(User_GetMyProfileDocument));
				if (data?.user_getMyProfile?.result === undefined) RefreshToken();
				graphQLClient.setHeader('Authorization', 'Bearer ' + token);

				dispatch({ type: 'INITIALIZE', payload: { isAuthenticated: true, isLoading: null } });
				if (router.pathname.includes('login') || router.pathname.includes('signup')) {
					router.push('/Admin');
				}
			} else {
				RefreshToken();
				//dispatch({ type: 'INITIALIZE', payload: { isAuthenticated: false, isLoading: null } });
				//if (!router.pathname.includes('login') && !router.pathname.includes('signup')) {
				//router.push('/login');
				//}
			}
		}
		initialize();
	}, []);

	const signInWithEmail = async (mobil, code) => {
		dispatch({ type: 'IS_LOADING', payload: { isLoading: 'SIGN_IN_WITH_EMAIL' } });
		try {
			await new Promise((resolve, reject) => {
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
								// Save token to cookie/localStorage
								// Example:
								graphQLClient.setHeader('Authorization', 'Bearer ' + res?.auth_verifyOtp?.result?.accessToken);
								saveCookie(ACCESS_TOKEN_KEY, res?.auth_verifyOtp?.result?.accessToken || '');
								saveCookie(REFRESH_TOKEN_KEY, res?.auth_verifyOtp?.result?.refreshToken || '');
								dispatch({ type: 'INITIALIZE', payload: { isAuthenticated: true, isLoading: null } });
								enqueueSnackbar('Login successful', { variant: 'success' });
								router.push('/Admin');
								resolve();
							} else {
								enqueueSnackbar('Invalid credentials', { variant: 'error' });
								dispatch({ type: 'IS_LOADING', payload: { isLoading: null } });
								reject();
							}
						},
						onError: () => {
							enqueueSnackbar('Login failed', { variant: 'error' });
							dispatch({ type: 'IS_LOADING', payload: { isLoading: null } });
							reject();
						},
					}
				);
			});
		} catch (err) {
			console.error(err);
		}
	};
	const RefreshToken = async () => {
		const accessToken = getCookieStorage(ACCESS_TOKEN_KEY);
		const refreshToken = getCookieStorage(REFRESH_TOKEN_KEY);

		await mutateRefresh(
			{
				input: {
					accessToken: accessToken,
					refreshToken: refreshToken,
				},
			},
			{
				onSuccess: async (res) => {
					saveCookie(ACCESS_TOKEN_KEY, res?.auth_refreshToken?.result?.accessToken || '');
					saveCookie(REFRESH_TOKEN_KEY, res?.auth_refreshToken?.result?.refreshToken || '');
					graphQLClient.setHeader('Authorization', 'Bearer ' + res?.auth_refreshToken?.result?.accessToken);

					dispatch({ type: 'INITIALIZE', payload: { isAuthenticated: true, isLoading: null } });
				},
				onError: (err) => {
					//logout();
				},
			}
		);
	};
	const logout = async () => {
		dispatch({ type: 'IS_LOADING', payload: { isLoading: 'SIGN_OUT' } });
		try {
			queryClient.clear();
			clearCookie(ACCESS_TOKEN_KEY);
			clearCookie(REFRESH_TOKEN_KEY);
			enqueueSnackbar('Logged out successfully', { variant: 'info' });
			dispatch({ type: 'INITIALIZE', payload: { isAuthenticated: false, isLoading: null } });
			router.push('/login');
		} catch (error) {
			console.error(error);
		} finally {
			dispatch({ type: 'IS_LOADING', payload: { isLoading: null } });
		}
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
