import type { AppProps } from "next/app";

import "@/styles/globals.scss";
import "../styles/typography.global.scss";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
