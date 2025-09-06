import { OrderPage } from '@/components/pages';
import Layout from '@/layouts';

const Page: NextPageWithLayout = () => {
	return <OrderPage />;
};

Page.getLayout = function getLayout(page) {
	return <Layout variant="Admin">{page}</Layout>;
};

export default Page;
