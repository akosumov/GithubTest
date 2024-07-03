import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import GET_REPOSITORY from '../../graphql/documents/getRepository'
import formatDate from '../../utils/helpers/formateDate'

interface RepositoryData {
	repository: {
		name: string
		stargazerCount: number
		updatedAt: string
		owner: {
			login: string
			avatarUrl: string
			url: string
		}
		languages: {
			nodes: {
				name: string
			}[]
		}
		description: string
	}
}

const Repository = () => {
	const { owner, name } = useParams<{ owner: string; name: string }>()
	console.log(owner, name)

	const { loading, error, data } = useQuery<RepositoryData>(GET_REPOSITORY, {
		variables: { owner, name },
	})

	if (loading)
		return (
			<div className='text-white text-2xl mt-10 font-bold flex justify-center'>
				Loading...
			</div>
		)
	if (error || !data || !data.repository) return <div>Error :</div>

	// Деструкторизция
	const {
		repository: {
			name: repoName,
			stargazerCount,
			updatedAt,
			owner: { login, avatarUrl, url },
			languages: { nodes: languages },
			description,
		},
	} = data

	return (
		<div className='p-8 flex flex-col gap-10'>
			<h1 className='text-white font-bold text-3xl'>GITHUB REPO</h1>
			<div className='flex items-start gap-8 text-xl text-white'>
				<img
					src={avatarUrl}
					alt={login}
					className='w-32 h-32 rounded-full object-cover'
				/>
				<div className='flex flex-col gap-y-2'>
					<a href={url} className='text-white text-3xl font-semibold'>
						{login}
					</a>
					<div className='flex items-center gap-x-9'>
						<p>Name: {repoName}</p>
						<p className='text-yellow-400'>{stargazerCount} ★</p>
					</div>
					<p>Updated on {formatDate(updatedAt)}</p>
					<div className='flex gap-3'>
						Languages:
						{languages.map(language => (
							<p key={language.name}>{language.name}</p>
						))}
					</div>
					<p>{description}</p>
				</div>
			</div>
		</div>
	)
}

export default Repository
