import { Theme } from '@mui/material';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';

declare global {
	type ThemeOverrideType = Theme;

	type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
		getLayout?: (page: ReactElement) => ReactNode;
	};

	type AppPropsWithLayout = AppProps & {
		Component: NextPageWithLayout;
	};

	type AuthLoading =
		| 'SIGN_OUT'
		| 'INITIALIZING'
		| 'RESET_PASSWORD'
		| 'SIGN_UP_WITH_EMAIL'
		| 'SIGN_IN_WITH_EMAIL'
		| 'SIGN_IN_WITH_GOOGLE'
		| 'SIGN_IN_WITH_FACEBOOK';

	type AuthContextActionType = 'INITIALIZE' | 'IS_LOADING';

	type AuthContextStateType = {
		isInitialized?: boolean;
		isAuthenticated?: boolean;
		isLoading?: AuthLoading | null;
	};

	type AuthContextType = AuthContextStateType & {
		logout: () => void;
		signInWithGoogle: () => void;
		signInWithFacebook: () => void;
		resetPassword: (email: string) => void;
		signInWithEmail: (Mobil: string) => void;
		signUpWithEmail: (email: string, password: string) => void;
	};

	type FirebaseToken = {
		aud: string;
		exp: number;
		iat: number;
		iss: string;
		sub: string;
		email: string;
		user_id: string;
		auth_time: number;
		email_verified: boolean;
		firebase: {
			identities: { email?: Array<string> };
			sign_in_provider: 'password' | string;
		};
	};
}
