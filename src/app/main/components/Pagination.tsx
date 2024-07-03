import PaginationItem from './PaginationItem'

interface PaginationProps {
	activePage: number
	totalPages: number
	setActivePage: (activePage: number) => void
}

const Pagination = ({
	activePage,
	totalPages,
	setActivePage,
}: PaginationProps) => {
	// генерируем массив для отображение paginationItem
	const pages = []

	for (let i = 1; i <= totalPages; i++) {
		pages.push(i)
	}

	return (
		<>
			<nav className='flex items-center gap-x-2' aria-label='Pagination'>
				{pages.map(page => (
					<PaginationItem
						activePage={activePage}
						page={page}
						setActivePage={setActivePage}
						key={page}
					/>
				))}
			</nav>
		</>
	)
}

export default Pagination
