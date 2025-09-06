import { useRouter } from 'next/router';
import React from 'react';

//import { UserTypes } from '@/graphql/generated';
//*import { useGetUser } from '@/hooks/useGetUser';
import { useAuth } from '@/providers/AuthProvider';

export default function GuestGuard({ children }: React.PropsWithChildren) {
	const router = useRouter();

	const { isAuthenticated } = useAuth();

	//*const userData = useGetUser({ enabled: !!isAuthenticated });

	/*React.useEffect(() => {
		if (isAuthenticated && userData) {
			//if (userData?.userTypes == UserTypes.Admin) router.push('/admin');
			//else {
			router.push('/');
			//}
		}
	}, [isAuthenticated, userData]);*/

	return <>{children}</>;
}

// how to use ? wrap it into login and register page, after you sign in as a user,
// this will redirect you automatically to proper page, see Login page for more information
