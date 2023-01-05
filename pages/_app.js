import "../styles/application.scss";
import { Public_Sans } from "@next/font/google"

const publicSans = Public_Sans({
  weight: "400",
  style: "normal",
  subsets: ["latin"]
}) 

function MyApp({ Component, pageProps }) {
  return (
    <main className={publicSans.className}>
      <Component {...pageProps} />;
    </main>
  )
}

export default MyApp;
