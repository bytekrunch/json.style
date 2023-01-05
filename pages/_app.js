import "../styles/application.scss";
import { Public_Sans } from "@next/font/google"

const publicSans = Public_Sans({
  weight: "500",
  style: "normal"
}) 

function MyApp({ Component, pageProps }) {
  return (
    <div className={publicSans.className}>
      <Component {...pageProps} />;
    </div>
  )
}

export default MyApp;
