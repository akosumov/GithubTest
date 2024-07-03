import { MutableRefObject } from 'react'

interface SkeletonProps {
	inputRef: MutableRefObject<HTMLInputElement | null>
	searchString: string
	handleChange: any
}

const Skeleton = ({ inputRef, searchString, handleChange }: SkeletonProps) => {
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

			<div role='status' className='grid grid-cols-2 gap-y-14 animate-pulse'>
				<div className='bg-gray-200 dark:bg-gray-700 w-96 h-28 mb-4'></div>
				<div className='bg-gray-200 dark:bg-gray-700 w-96 h-28 mb-4'></div>
				<div className='bg-gray-200 dark:bg-gray-700 w-96 h-28 mb-4'></div>
				<div className='bg-gray-200 dark:bg-gray-700 w-96 h-28 mb-4'></div>
				<div className='bg-gray-200 dark:bg-gray-700 w-96 h-28 mb-4'></div>
				<div className='bg-gray-200 dark:bg-gray-700 w-96 h-28 mb-4'></div>
				<div className='bg-gray-200 dark:bg-gray-700 w-96 h-28 mb-4'></div>
				<div className='bg-gray-200 dark:bg-gray-700 w-96 h-28 mb-4'></div>
				<div className='bg-gray-200 dark:bg-gray-700 w-96 h-28 mb-4'></div>
				<div className='bg-gray-200 dark:bg-gray-700 w-96 h-28 mb-4'></div>
			</div>
		</div>
	)
}

export default Skeleton
