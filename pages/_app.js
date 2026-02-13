import Script from 'next/script'
import 'antd/dist/antd.css'
import '../styles/global.css'

import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo/apolloClient'

const MyApp = ({ Component, pageProps }) => {
  // Instantiates Apollo client, reads Next.js props and initialized Apollo with them - this caches data into Apollo.
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={ apolloClient }>
      <Script id="matomo" strategy="afterInteractive">
        {`
          var _paq = window._paq = window._paq || [];
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="//matomo.rcefc.org/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '2']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
          })();
        `}
      </Script>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
