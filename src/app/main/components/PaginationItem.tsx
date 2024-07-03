interface PaginationItemProps {
	page: number
	activePage: number
	setActivePage: (activePage: number) => void
}

const PaginationItem = ({
	page,
	activePage,
	setActivePage,
}: PaginationItemProps) => {
	return (
		<>
			{activePage === page ? (
				<div
					aria-current='page'
					className='flex justify-center items-center w-8 h-8 text-sm font-semibold text-white ring-1 ring-inset ring-white hover:bg-gray-50 cursor-pointer rounded-full '
				>
					{page}
				</div>
			) : (
				<div
					aria-current='page'
					className='flex justify-center items-center w-8 h-8 text-sm font-semibold text-[#5D5D5D] ring-1 ring-inset ring-[#5D5D5D] hover:bg-gray-50 cursor-pointer rounded-full '
					onClick={() => {
						setActivePage(page)
					}}
				>
					{page}
				</div>
			)}
		</>
	)
}

export default PaginationItem
