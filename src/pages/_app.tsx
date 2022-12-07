import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { SnippylyProvider } from '@snippyly/react';
import { Snippyly } from '@snippyly/types';

function MyApp({ Component, pageProps }: AppProps) {
  console.log('my app called')
  const init = async (client?: Snippyly) => {

    if (client) {
      // To enable text comment feature
      const commentElement = client.getCommentElement();
      commentElement.enableTextComments(true);
      // Enable attachment feature
      commentElement.enableAttachment(true);
      // To enable text comment feature
      const selectionElement = client.getSelectionElement();
      // Show screen size info
      commentElement.showScreenSizeInfo(true);
      selectionElement.enableLiveSelection(true);
      // Set document id
      client.setDocumentId(excludeSnippylyParamsFromUrl(window.location.href));
    }
  }

  const excludeSnippylyParamsFromUrl = (url: string) => {
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
