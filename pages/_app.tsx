import "../styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";

// ReactQuery初期化
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // defaultの自動で三回リクエストを送る機能をなし
      retry: false,
      // defaultのフォーカスしたらリクエストを送る機能もなし
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  // front,backendでcookieのやり取りをする場合下記をtrueにする
  axios.defaults.withCredentials = true;

  // マウントされるたびにcsrfTokenを取得してheaderにいれる
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
      );
      // headerにいれる処理
      axios.defaults.headers.common["csrf-token"] = data.csrfToken;
    };
    getCsrfToken();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
          fontFamily: "Verdana, sans-serif",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
