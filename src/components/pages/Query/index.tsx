import axios from 'axios';
import config from 'config';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import { ACCESS_TOKEN_KEY, UserName } from '@/utils/constants';
import { getCookieStorage } from '@/utils/storage/cookie';

export function useQueryAxios() {
	const { enqueueSnackbar } = useSnackbar();
	const router = useRouter();

	const Signin = async (username: string, timestamp: number, password: string) => {
		return new Promise(function (resolve) {
			axios
				.post(config.API_URL + 'login', {
					username: username,
					timestamp: timestamp,
					password: password,
				})
				.then(function (res) {
					resolve(true);
				})
				.catch(function (error) {
					resolve(false);
				});
		});
	};
	const CodeLogin = async (username: string, message: string) => {
		return new Promise(function (resolve) {
			axios
				.post(config.API_URL + 'valid_login_message', {
					username: username,
					message: message,
				})
				.then(function (res) {
					// saveCookie(Cuerent_User, {
					// 	id: res?.data?.citizen.id,
					// 	//avatar: base64_encode(res?.data?.citizen.avatar),
					// 	firstname: res?.data?.citizen.firstname,
					// 	lastname: res?.data?.citizen.lastname,
					// 	username: res?.data?.citizen.username,
					// });
					resolve(res?.data?.token);
				})
				.catch(function (error) {
					resolve(false);
					//enqueueSnackbar(error.response.data, { variant: 'error' });
				});
		});
	};

	const GetfirstPageCommute = async () => {
		return new Promise(function (resolve) {
			const configheaders = {
				headers: {
					Authorization: `Bearer ${getCookieStorage(ACCESS_TOKEN_KEY)}`,
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			};

			axios
				.post(
					config.API_URL + 'firstPageCommute',
					JSON.stringify({
						username: getCookieStorage(UserName),
					}),
					configheaders
				)
				.then(function (res) {
					resolve(res?.data);
				})
				.catch(function (error) {
					if (error.response.status === 401) router.push('/login');
					else enqueueSnackbar(error.response.data, { variant: 'error' });
				});
		});
	};
	return { Signin, CodeLogin, GetfirstPageCommute };
}
