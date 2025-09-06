import { NeighborhoodPage } from '@/components/pages';
import Layout from '@/layouts';

const Login: NextPageWithLayout = () => {
	return <NeighborhoodPage />;
};

Login.getLayout = function getLayout(page) {
	return <Layout variant="AdminLayout">{page}</Layout>;
};

export default Login;
