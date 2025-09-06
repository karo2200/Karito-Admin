import { LoginPage } from '@/components/pages';
import Layout from '@/layouts';

const Login: NextPageWithLayout = () => {
	return <LoginPage />;
};

Login.getLayout = function getLayout(page) {
	return <Layout variant="Auth">{page}</Layout>;
};

export default Login;
