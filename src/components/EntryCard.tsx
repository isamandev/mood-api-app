import type { JournalEntry, Analysis } from '@/generated/prisma'

type EntryWithAnalysis = JournalEntry & { analysis: Analysis | null }

interface EntryCardProps {
	entry: EntryWithAnalysis
}

function EntryCard({ entry }: EntryCardProps) {
	const date = new Date(entry.createdAt).toLocaleDateString('fa-IR', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return (
		<div className='divide-y divide-gray-200 overflow-hidden rounded-lg bg-white border border-black/10'>
			<div className='px-2 py-4 sm:px-6'>
				<span className='block text-sm text-gray-500 mb-1'>تاریخ</span>
				<span className='text-base'>{date}</span>
			</div>

			<div className='px-2 py-4 sm:px-6'>
				<span className='block text-sm text-gray-500 mb-1'>خلاصه</span>
				<span className='text-base'>{entry.analysis?.summary ?? 'خلاصه‌ای ثبت نشده'}</span>
			</div>

			<div className='px-2 py-4 sm:px-6'>
				<span className='block text-sm text-gray-500 mb-1'>حال و هوا</span>
				<span className='text-base'>{entry.analysis?.mood ?? '—'}</span>
			</div>
		</div>
	)
}

export default EntryCard
