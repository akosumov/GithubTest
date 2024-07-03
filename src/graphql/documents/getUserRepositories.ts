import { gql } from '@apollo/client'

const GET_USER_REPOSITORIES = gql`
	query GetUserRepositories($login: String!, $first: Int = 100) {
		user(login: $login) {
			repositories(first: $first) {
				nodes {
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
		}
	}
`

export default GET_USER_REPOSITORIES
