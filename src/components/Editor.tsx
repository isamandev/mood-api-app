'use client'

import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { useRouter } from 'next/navigation'
import { deleteEntry, updateEntry } from '@/utils/api'
import Spinner from './Spinner'

type EditorAnalysis = {
	color: string
	mood: string
	summary: string
	negative: boolean
}

export type EditorEntry = {
	id: string
	content: string
	analysis: EditorAnalysis | null
}

type EditorProps = {
	entry: EditorEntry
}

const Editor = ({ entry }: EditorProps) => {
	const [text, setText] = useState(entry.content)
	const [currentEntry, setEntry] = useState<EditorEntry>(entry)
	const [isSaving, setIsSaving] = useState(false)
	const router = useRouter()

	const handleDelete = async () => {
		await deleteEntry(entry.id)
		router.push('/journal')
	}

	useAutosave({
		data: text,
		onSave: async (_text: string) => {
			if (_text === entry.content) return
			setIsSaving(true)
			const { data } = await updateEntry(entry.id, { content: _text })
			setEntry(data as EditorEntry)
			setIsSaving(false)
		},
	})

	const bgColor = currentEntry.analysis?.color ?? '#e5e7eb'
	const mood = currentEntry.analysis?.mood ?? '—'
	const summary = currentEntry.analysis?.summary ?? '—'
	const negative = currentEntry.analysis?.negative ?? false

	return (
		<div className='w-full h-full grid grid-cols-3 gap-0 relative'>
			<div className='absolute left-0 top-0 p-2'>{isSaving ? <Spinner /> : <div className='w-[16px] h-[16px] rounded-full bg-green-500'></div>}</div>

			<div className='col-span-2'>
				<textarea value={text} onChange={e => setText(e.target.value)} className='w-full h-full text-xl p-8' />
			</div>

			<div className='border-l border-black/5'>
				<div style={{ background: bgColor }} className='h-[100px] text-white p-8'>
					<h2 className='text-2xl bg-white/25 text-black'>تحلیل</h2>
				</div>

				<div>
					<ul role='list' className='divide-y divide-gray-200'>
						<li className='py-4 px-8 flex items-center justify-between'>
							<div className='text-md font-semibold w-1/3'>خلاصه</div>
							<div className='text-md'>{summary}</div>
						</li>
						<li className='py-4 px-8 flex items-center justify-between'>
							<div className='text-md font-semibold'>حال و هوا</div>
							<div className='text-md'>{mood}</div>
						</li>
						<li className='py-4 px-8 flex items-center justify-between'>
							<div className='text-md font-semibold'>منفی</div>
							<div className='text-md'>{negative ? 'بله' : 'خیر'}</div>
						</li>
						<li className='py-4 px-8 flex items-center justify-between'>
							<button
								onClick={handleDelete}
								type='button'
								className='rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
							>
								حذف
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Editor
