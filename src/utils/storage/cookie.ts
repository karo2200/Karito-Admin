import { destroyCookie, parseCookies, setCookie } from 'nookies';

export function saveCookie(key: string, value?: string | Record<string, any>) {
	try {
		if (typeof value === 'string') {
			setCookie(null, key, value, { path: '/' });
		} else {
			setCookie(null, key, JSON.stringify(value), { path: '/' });
		}
	} catch (err) {
		// ignore event
	}
}

export function getCookieStorage(key: string, isString = true) {
	try {
		const cookies = parseCookies();

		const value = cookies[key];
		if (value) {
			if (isString) return value;
			return JSON.parse(value);
		}
	} catch (err) {
		// ignore event
	}
}

export function clearCookie(key: string) {
	try {
		destroyCookie(null, key, { path: '/' });
	} catch (err) {
		// ignore event
	}
}
