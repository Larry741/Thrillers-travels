import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";

import "@/styles/globals.scss";
import "../styles/typography.global.scss";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="A travel booking platform" />
				<title>Thrillers travels</title>

				<DefaultSeo
					title="Thrillers travels"
					description="A travel booking platform"
					openGraph={{
						title: "Thrillers travels",
						description: "A travel booking platform",
						url: process.env.NEXT_PUBLIC_APP_URL,
					}}
					twitter={{
						site: "@site",
						cardType: "summary",
					}}
				/>
			</Head>
			<Component {...pageProps} />
		</>
	);
}
