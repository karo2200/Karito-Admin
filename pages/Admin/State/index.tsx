import { StatePage } from '@/components/pages';
import Layout from '@/layouts';

const Login: NextPageWithLayout = () => {
	return <StatePage />;
};

Login.getLayout = function getLayout(page) {
	return <Layout variant="AdminLayout">{page}</Layout>;
};

export default Login;
