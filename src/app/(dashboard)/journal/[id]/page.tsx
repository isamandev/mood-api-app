// app/journal/[id]/page.tsx
import Editor, { type EditorEntry } from '@/components/Editor'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

type PageProps = { params: { id: string } }

const getEntry = async (id: string) => {
	const user = await getUserFromClerkID()
	return prisma.journalEntry.findFirst({
		where: { id, userId: user.id },
		include: { analysis: true },
	})
}

const JournalEditorPage = async ({ params }: PageProps) => {
	const id = (await params).id

	const entry = await getEntry(id)

	if (!entry) {
		return <div>یادداشتی پیدا نشد</div>
	}

	const editorEntry = {
		id: entry.id,
		content: entry.content,
		analysis: entry.analysis
			? {
					color: entry.analysis.color,
					mood: entry.analysis.mood,
					summary: entry.analysis.summary,
					negative: entry.analysis.negative,
			  }
			: null,
	} satisfies EditorEntry

	return (
		<div className='w-full h-full'>
			<Editor entry={editorEntry} />
		</div>
	)
}

export default JournalEditorPage
