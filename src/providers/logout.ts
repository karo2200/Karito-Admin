// src/utils/logout.ts
import router from 'next/router';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/utils/constants';
import { clearCookie } from '@/utils/storage/cookie';

export function logout() {
	clearCookie(ACCESS_TOKEN_KEY);
	clearCookie(REFRESH_TOKEN_KEY);

	// مهم: جلوگیری از چند بار push
	if (router.pathname !== '/login') {
		router.push('/login');
	}
}
