import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import { Cache, QueryInput } from "@urql/exchange-graphcache";
import theme from "../theme";
import "./global.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      {/* <ColorModeProvider> */}
      <CSSReset />
      <Component {...pageProps} />
      {/* </ColorModeProvider> */}
    </ThemeProvider>
  );
}
