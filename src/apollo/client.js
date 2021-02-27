import { ApolloClient, InMemoryCache , HttpLink } from '@apollo/client'

const Client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: '/.netlify/functions/API'
    })
})

export default Client