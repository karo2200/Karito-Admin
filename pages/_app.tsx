// scroll bar
import 'simplebar-react/dist/simplebar.min.css';
// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import '@/theme/index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ProgressBar } from '@/components/atoms';
import AuthProvider from '@/providers/AuthProvider';
import NotistackProvider from '@/providers/NotistackProvider';
import { ThemeProvider } from '@/theme';

import store, { persistor } from '../src/redux/store';

export const queryClient = new QueryClient();

const App = (props: AppPropsWithLayout) => {
	const { Component, pageProps } = props;

	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
				<link rel="icon" href="/images/logp.jpg" sizes="any" />
			</Head>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<NotistackProvider>
							<AuthProvider>
								<ThemeProvider>
									<ProgressBar />
									{getLayout(<Component {...pageProps} />)}
								</ThemeProvider>
							</AuthProvider>
						</NotistackProvider>
					</PersistGate>
				</Provider>
			</QueryClientProvider>
		</>
	);
};

export default App;
