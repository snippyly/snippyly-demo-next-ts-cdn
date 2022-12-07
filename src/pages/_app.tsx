import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { SnippylyProvider } from '@snippyly/react';
import { Snippyly } from '@snippyly/types';

function MyApp({ Component, pageProps }: AppProps) {

  const init = async (client?: Snippyly) => {
    if (client) {
      // Enable attachment feature
      const commentElement = client.getCommentElement();
      commentElement.enableAttachment(true);
      commentElement.showScreenSizeInfo(true);
    }

  }

  return (
    <SnippylyProvider apiKey='4ZkRt6W2Qr6zMuBk04hn'
      config={{
        // featureAllowList: ['presence', 'cursor'],
        // userIdAllowList: ['abcd'],
        // urlAllowList: [],
      } as any} onClientLoad={(client) => init(client)}>
      <Component {...pageProps} />
    </SnippylyProvider>
  )
}

export default MyApp
