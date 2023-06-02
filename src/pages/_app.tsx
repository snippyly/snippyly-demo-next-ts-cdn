import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { VeltProvider } from '@veltdev/react';
import { Velt } from '@veltdev/types';

function MyApp({ Component, pageProps }: AppProps) {
  console.log('my app called')
  const init = async (client?: Velt) => {

    if (client) {
      // To enable text comment feature
      const commentElement = client.getCommentElement();
      commentElement.enableTextComments();
      // Enable attachment feature
      commentElement.enableAttachments();
      // To enable text comment feature
      const selectionElement = client.getSelectionElement();
      // Show screen size info
      commentElement.enableDeviceInfo();
      selectionElement.enableLiveSelection();
      // Set document id
      client.setDocumentId(excludeVeltParamsFromUrl(window.location.href));
    }
  }

  const excludeVeltParamsFromUrl = (url: string) => {
    try {
      const tempUrl = new URL(url);
      ['review', 'sreviewId', 'snippyly-user', 'scommentId', 'stagId'].forEach((param) => {
        tempUrl.searchParams.delete(param);
      });
      return tempUrl.href;
    } catch (err) {
      return url;
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
