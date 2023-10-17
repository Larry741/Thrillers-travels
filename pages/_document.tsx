import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&family=Work+Sans:wght@400;600&display=swap"
					rel="stylesheet"></link>

				<link rel="mask-icon" href="/favicon.svg" color="#000000" />
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
