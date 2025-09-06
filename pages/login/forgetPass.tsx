import { ForgetPass } from '@/components/pages';
import Layout from '@/layouts';

const Login: NextPageWithLayout = () => {
	return <ForgetPass />;
};

Login.getLayout = function getLayout(page) {
	return <Layout variant="Auth">{page}</Layout>;
};

export default Login;
