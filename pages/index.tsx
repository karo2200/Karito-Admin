import { AdminPage } from '@/components/pages';
import Layout from '@/layouts';

const Page: NextPageWithLayout = () => {
	return <AdminPage />;
};

Page.getLayout = function getLayout(page) {
	return <Layout variant="Auth">{page}</Layout>;
};

export default Page;
