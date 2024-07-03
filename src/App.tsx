import { Routes, Route } from 'react-router-dom'
import Main from './app/main/Main'
import Repository from './app/repository/Repository'

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Main />} />
			<Route path='/repository/:owner/:name' element={<Repository />} />
		</Routes>
	)
}

export default App
