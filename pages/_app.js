import 'antd/dist/antd.css'
import '../styles/global.css'

import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo/apolloClient'

const MyApp = ({ Component, pageProps }) => {
  // Instantiates Apollo client, reads Next.js props and initialized Apollo with them - this caches data into Apollo.
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={ apolloClient }>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
