import { gql } from '@apollo/client'

const GET_REPOSITORY = gql`
	query GetRepository($owner: String!, $name: String!) {
		repository(owner: $owner, name: $name) {
			name
			stargazerCount
			updatedAt
			owner {
				login
				avatarUrl
				url
			}
			languages(first: 10) {
				nodes {
					name
				}
			}
			description
		}
	}
`

export default GET_REPOSITORY
