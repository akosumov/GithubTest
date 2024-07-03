// Форматируем удобный для нас формат даты

const formatDate = (isoDate: string) => {
	const date = new Date(isoDate)

	const day = date.getDate()
	const month = date.toLocaleString('en-US', { month: 'long' })

	return `${day} ${month}`
}

export default formatDate
