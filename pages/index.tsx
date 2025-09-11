import { LoginPage } from '@/components/pages';
import Layout from '@/layouts';

const Page: NextPageWithLayout = () => {
	return <LoginPage />;
};

Page.getLayout = function getLayout(page) {
	return <Layout variant="Auth">{page}</Layout>;
};

export default Page;
