'use client'

import { FiPlus } from 'react-icons/fi'
import { newEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'

const NewEntry = () => {
	const router = useRouter()

	const handleOnClick = async () => {
		const response = await newEntry()
		router.push(`/journal/${response.data.id}`)
	}

	return (
		<div
			className='cursor-pointer overflow-hidden rounded-lg bg-gray-100 border border-black/10 flex flex-col items-center justify-center p-6 hover:bg-gray-50 transition'
			onClick={handleOnClick}
		>
			<FiPlus className='text-3xl mb-2' />
			<span className='text-xl'>یادداشت جدید</span>
		</div>
	)
}

export default NewEntry
