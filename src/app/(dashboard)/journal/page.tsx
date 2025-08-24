import EntryCard from '@/components/EntryCard'
import NewEntry from '@/components/NewEntry'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

const getEntries = async () => {
	const user = await getUserFromClerkID()
	const data = await prisma.journalEntry.findMany({
		where: {
			userId: user.id,
		},
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			analysis: true,
		},
	})

	return data
}

const JournalPage = async () => {
	const data = await getEntries()

	return (
		<div className='p-6 bg-zinc-100/50 h-full'>
			<h1 className='text-2xl mb-6'>دفترچه‌ها</h1>
			<div className='grid grid-cols-4 gap-4'>
				<NewEntry />
				{data.map(entry => (
					<div key={entry.id}>
						<Link href={`/journal/${entry.id}`}>
							<EntryCard entry={entry} />
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}

export default JournalPage
