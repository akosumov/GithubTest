import { useQuery } from '@apollo/client'
import { SEARCH } from '../../graphql/documents/search'
import { useState, useRef, useEffect } from 'react'
import { ChangeEvent } from 'react'
import Pagination from './components/Pagination'
import {
	transformDataSearch,
	transformDataUser,
} from '../../utils/helpers/transformData'
import Skeleton from './components/Skeleton'
import formatDate from '../../utils/helpers/formateDate'
import GET_USER_REPOSITORIES from '../../graphql/documents/getUserRepositories'

const Main = () => {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [searchString, setSearchString] = useState<string>(
		localStorage.getItem('searchString') || ''
	)
	const [currentPage, setCurrentPage] = useState<number>(
		parseInt(localStorage.getItem('currentPage') || '1', 10)
	)

	const [resultsPerPage] = useState<number>(10)
	const query = `${searchString} in:name`

	// Запрос к api и проверям пуст ли searchString для отображения наших репозиториев
	const { loading, error, data } = useQuery(
		searchString ? SEARCH : GET_USER_REPOSITORIES,
		{
			variables: {
				query: searchString ? query : '',
				first: 100,
				login: !searchString ? 'akosumov' : '',
			},
		}
	)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchString(event.target.value)
		setCurrentPage(1)
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	// Запись текущего состояния в localStorage для сохранения после перезагрузки страницы
	useEffect(() => {
		localStorage.setItem('searchString', searchString)
		localStorage.setItem('currentPage', String(currentPage))
	}, [searchString, currentPage])

	// Установка фокуса на поле ввода при загрузке страницы
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [data])

	if (loading)
		return (
			<Skeleton
				inputRef={inputRef}
				searchString={searchString}
				handleChange={handleChange}
			/>
		)

	if (error) return <h2 className='text-white'>Error</h2>

	// Преобразование исходных данных в формат для отображения
	const options = searchString
		? transformDataSearch(data)
		: transformDataUser(data)

	// Пагинация
	const totalPages = Math.ceil(options.length / resultsPerPage)
	const startIndex = (currentPage - 1) * resultsPerPage
	const endIndex = startIndex + resultsPerPage
	const paginatedOptions = options.slice(startIndex, endIndex)

	return (
		<div className='p-8 flex flex-col gap-y-16'>
			<div className='flex items-center gap-x-56'>
				<h1 className='text-white font-bold text-3xl'>GITHUB REPO</h1>
				<input
					ref={inputRef}
					type='text'
					value={searchString}
					placeholder='Find a repository...'
					onChange={handleChange}
					className='border text-white text-sm rounded-lg p-2 bg-gray-700 border-gray-600 placeholder-gray-400 outline-none w-60'
				/>
			</div>

			<div className='grid grid-cols-2 gap-y-14'>
				{searchString
					? paginatedOptions.map((rep: any) => {
							return (
								<div
									className='w-96 border-y-2 border-gray-500 flex flex-col justify-start gap-y-2 '
									key={rep.url}
								>
									<div className='flex justify-between items-center'>
										<a
											href={`/repository/${rep.value}/${rep.name}`}
											className='text-3xl text-white'
										>
											{rep.name}
										</a>
										<h2 className='text-yellow-400 text-xl'>
											{rep.stargazerCount} ★
										</h2>
									</div>

									<h2 className='text-white'>
										Updated on {formatDate(rep.lastCommited)}
									</h2>
									<a href={rep.url} className='text-white'>
										{rep.url}
									</a>
								</div>
							)
					  })
					: paginatedOptions.map((rep: any) => {
							return (
								<div
									className='w-96 border-y-2 border-gray-500 flex flex-col justify-start gap-y-2 '
									key={rep.updatedAt}
								>
									<div className='flex justify-between items-center'>
										<a
											href={`/repository/${rep.owner.login}/${rep.name}`}
											className='text-3xl text-white'
										>
											{rep.name}
										</a>
										<h2 className='text-yellow-400 text-xl'>
											{rep.stargazerCount} ★
										</h2>
									</div>

									<h2 className='text-white'>
										Updated on {formatDate(rep.updatedAt)}
									</h2>
									<a href={rep.owner.url} className='text-white'>
										{rep.owner.url}
									</a>
								</div>
							)
					  })}
			</div>
			{!paginatedOptions.length && (
				<div className='text-white text-5xl font-semibold m-auto'>
					Not found
				</div>
			)}

			<div>
				{paginatedOptions.length > 0 && (
					<Pagination
						activePage={currentPage}
						totalPages={totalPages}
						setActivePage={handlePageChange}
					/>
				)}
			</div>
		</div>
	)
}

export default Main
