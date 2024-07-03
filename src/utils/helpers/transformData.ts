export const transformDataSearch = (data: any) => {
	return (
		data?.search.edges
			.filter(
				(edge: any) =>
					edge &&
					edge.__typename === 'SearchResultItemEdge' &&
					edge.node &&
					edge.node.__typename === 'Repository'
			)
			.map((edge: any) => {
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

export const transformDataUser = (data: any) => {
	return (
		data?.user.repositories.nodes
			.filter(
				(node: any) =>
					node && node.__typename === 'Repository' && node.description
			)
			.map((node: any) => {
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
