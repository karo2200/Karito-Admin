import { LandingPage } from '@/components/pages';

const Login: NextPageWithLayout = () => {
	return <LandingPage />;
};

Login.getLayout = function getLayout(page) {
	return <>{page}</>;
};

export default Login;
