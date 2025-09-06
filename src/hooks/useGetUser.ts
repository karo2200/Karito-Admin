import { UseQueryOptions } from '@tanstack/react-query';
import { User_GetMyProfileQuery, UserProfileDto, useUser_GetMyProfileQuery } from 'src/graphql/generated';

import { useAuth } from '@/providers/AuthProvider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGetUser(options?: UseQueryOptions<User_GetMyProfileQuery, any, any>): UserProfileDto {
	if (useUser_GetMyProfileQuery({}, options)?.data?.user_getCurrentUser?.result === undefined) {
		const { RefreshToken } = useAuth();
		RefreshToken();
	} else return useUser_GetMyProfileQuery({}, options)?.data?.user_getCurrentUser?.result;
}
