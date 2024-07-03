import { gql } from '@apollo/client'

export const SEARCH = gql`
	query SearchRepositories($query: String!, $first: Int = 100) {
		search(query: $query, type: REPOSITORY, first: $first) {
			edges {
				node {
					... on Repository {
						name
						description
						url
						stargazerCount
						forkCount
						owner {
							login
						}
						defaultBranchRef {
							target {
								... on Commit {
									committedDate
								}
							}
						}
					}
				}
			}
		}
	}
`
