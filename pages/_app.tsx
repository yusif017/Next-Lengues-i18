import { AuthProvider } from "@/context/authContext";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { IntlProvider, useIntl } from "react-intl";
import '../styles/globals.css'
type Locale = "az" | "en" | "ru";
import { AppProps } from 'next/app';
import Head from "next/head";

const messages: Record<Locale, Record<string, string>> = {
  "az": require("../public/languages/az.json"),
  "en": require("../public/languages/en.json"),
  "ru": require("../public/languages/ru.json"),
};
function getDirection(locale: Locale): string {
  return "ltr";
}
const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { locale } = useRouter();
  const validatedLocale = locale as Locale;

  return (
    <>
      <Head>
        <link rel="alternate" href="https://webconsole.az" hrefLang="x-default" />
        <link rel="alternate" href="https://webconsole.az/az" hrefLang="az" />
        <link rel="alternate" href="https://webconsole.az/" hrefLang="en" />
        <link rel="alternate" href="https://webconsole.az/az" hrefLang="ru" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" type="crossorigin"/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <link rel="icon" href="/photo/webbconsolee12.png" />
        <meta name="author" content="web console studio"/>
        <meta name="description" content={"description"}/>
        <meta  name="keywords" content={"keywords"}/>
      </Head>
      <IntlProvider locale={validatedLocale} messages={messages[validatedLocale] || {}}>
      <AuthProvider>
          <Component {...pageProps} dir={getDirection(validatedLocale)} />
          </AuthProvider>
      </IntlProvider>
    </>
  );
};

export default MyApp;