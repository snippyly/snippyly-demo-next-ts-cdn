import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import SnippylyWrapper from './snippylyWrapper'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnippylyWrapper>
      <Component {...pageProps} />
    </SnippylyWrapper>)
}

export default MyApp
