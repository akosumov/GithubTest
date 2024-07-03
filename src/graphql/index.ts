import { ApolloClient, InMemoryCache } from '@apollo/client'

const apiKey = import.meta.env.VITE_API_KEY as string

const client = new ApolloClient({
	uri: 'https://api.github.com/graphql',
	cache: new InMemoryCache(),
	headers: {
		Authorization: `Bearer ${apiKey}`,
	},
})

export default client
