import { useEffect, useMemo, useState } from 'react';
import { SnippylyContext } from '../context/snippylyContext';
import loadSnippyly from '../loadSnippyly';
import { Snippyly as SnippylyClient } from '@snippyly/types';

declare var Snippyly: SnippylyClient;

export default function SnippylyWrapper({ children }: { children: any }) {
    const [client, setClient] = useState<SnippylyClient>(null as any);

    const snippyly = useMemo<SnippylyClient>(() => client, [client]);

    useEffect(() => {
        loadSnippyly(() => {
            init();
        })
    }, [])

    // Callback function that is called once Snippyly SDK is loaded.
    const init = async () => {
        const client = await Snippyly.init('4ZkRt6W2Qr6zMuBk04hn', {
            featureAllowList: [], // To allow specific features only
            userIdAllowList: [], // To allow specific users only
            urlAllowList: [], // To allow snippyly in specific screens only
        }); // Add your Api Key here
        setClient(client);
    }

    return (
        <SnippylyContext.Provider value={{ client: snippyly }}>
            {children}
        </SnippylyContext.Provider>
    );
}