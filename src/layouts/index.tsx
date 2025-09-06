import { PropsWithChildren } from 'react';

import Admin from './admin';
import AdminLayout from './adminLayout';
import AuthLayout from './auth';
interface LayoutProps extends PropsWithChildren {
	variant: 'Auth' | 'Admin' | 'AdminLayout';
}

const Layout = ({ variant, children }: LayoutProps) => {
	if (variant == 'Admin') {
		return (
			// <AuthGuard>
			<Admin>{children}</Admin>
			// </AuthGuard>
		);
	} else if (variant === 'Auth') {
		return <AuthLayout>{children}</AuthLayout>;
	} else if (variant === 'AdminLayout') {
		return <AdminLayout>{children}</AdminLayout>;
	}
	return null;
};

export default Layout;
