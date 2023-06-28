import { Provider } from "react-redux";
import store from "../redux/store";
import Layout from "@/components/layout";
import { LoadingProvider } from "@/components/modal/loading/loadingProvider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Provider store={store}>
        <LoadingProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LoadingProvider>
      </Provider>
    </>
  );
}
