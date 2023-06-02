import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { VeltProvider } from '@veltdev/react';
import { Velt } from '@veltdev/types';

function MyApp({ Component, pageProps }: AppProps) {

  const init = async (client?: Velt) => {
    if (client) {
      // Enable attachment feature
      const commentElement = client.getCommentElement();
      commentElement.enableAttachments();
      commentElement.enableDeviceInfo();
    }

  }

  return (
    <VeltProvider apiKey='4ZkRt6W2Qr6zMuBk04hn'
      config={{
        // featureAllowList: ['presence', 'cursor'],
        // userIdAllowList: ['abcd'],
        // urlAllowList: [],
      } as any} onClientLoad={(client) => init(client)}>
      <Component {...pageProps} />
    </VeltProvider>
  )
}

export default MyApp
