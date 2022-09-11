import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from 'shared/lib/store'
import {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider,
} from 'styled-components'
import { Layout } from '../components/layout'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;

    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 800;
    line-height: 19px;
    color: #000;

    background-color: #fff;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    display: block;

    max-width: 100%;
    height: auto;
  }

  * {
    box-sizing: border-box;
  }
`

const theme: DefaultTheme = {
  colors: {
    cream: '#E4B062',
    blueWater: '#27569C',
    error: 'crimson',
  },

  breakpoints: {
    mobile: '(max-width: 554px)',
    tablet: '(min-width: 555px) and (max-width: 1043px)',
    desktop: '(min-width: 1044px)',
  },

  padding: {
    container: {
      mobile: '15px',
      tablet: '37px',
      desktop: '41px',
    },
  },
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ThemeProvider>
    </>
  )
}
