import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { FullscreenLoading } from '@/components/organisms';
import { useAuth } from '@/providers/AuthProvider';

export default function AuthGuard({ children }: React.PropsWithChildren) {
	const { isAuthenticated, isInitialized } = useAuth();

	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) return;
		if (router.pathname != '/Landing') router.push('/login');
	}, [isAuthenticated]);

	if (!isInitialized) {
		return <FullscreenLoading />;
	}
	if (!isAuthenticated) {
		return null;
	}
	return <>{children}</>;
}
