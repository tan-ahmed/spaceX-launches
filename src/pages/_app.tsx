import { AppProps } from 'next/app';
import '../styles/globals.css';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import { API_URL } from '../constants/constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
axios.defaults.baseURL = API_URL;

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
