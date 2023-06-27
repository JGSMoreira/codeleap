import { Provider } from "react-redux";
import store from "../redux/store";
import "./globals.css";
import Layout from "@/components/layout";
import { LoadingProvider } from "@/components/modal/loading/loadingProvider";

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <LoadingProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LoadingProvider>
    </Provider>
  );
}
