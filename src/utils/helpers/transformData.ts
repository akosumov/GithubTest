export const transformDataSearch = data => {
	return (
		data?.search.edges
			.filter(
				edge =>
					edge &&
					edge.__typename === 'SearchResultItemEdge' &&
					edge.node &&
					edge.node.__typename === 'Repository'
			)
			.map(edge => {
				if (edge && edge.__typename === 'SearchResultItemEdge') {
					if (edge.node && edge.node.__typename === 'Repository') {
						return {
							...edge.node,
							value: edge.node?.owner.login,
							lastCommited: edge.node?.defaultBranchRef?.target?.committedDate,
							cursor: edge?.cursor,
						}
					}
				}
				return edge
			}) ?? []
	)
}

export const transformDataUser = data => {
	return (
		data?.user.repositories.nodes
			.filter(
				node => node && node.__typename === 'Repository' && node.description
			)
			.map(node => {
				if (node && node.__typename === 'Repository') {
					if (node.node && node.node.__typename === 'Repository') {
						return {
							...node,
						}
					}
				}
				return node
			}) ?? []
	)
}
