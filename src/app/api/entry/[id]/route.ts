import { NextResponse } from 'next/server'
import { prisma } from '@/utils/db'
import { update } from '@/utils/actions'
import { getUserFromClerkID } from '@/utils/auth'

interface Params {
	id: string
}

interface AnalysisInput {
	mood?: string
	summary?: string
	color?: string
	negative?: boolean
}

interface PatchRequestBody {
	updates: Partial<{
		content: string
		analysis: AnalysisInput
	}>
}

export const DELETE = async (request: Request, { params }: { params: Params }) => {
	const user = await getUserFromClerkID()

	const id = (await params).id

	await prisma.analysis.delete({
		where: { entryId: id },
	})

	await prisma.journalEntry.delete({
		where: {
			id,
			userId: user.id,
		},
	})

	update(['/journal'])

	return NextResponse.json({ data: { id: id } })
}

export const PATCH = async (request: Request, { params }: { params: Params }) => {
	const { updates } = (await request.json()) as PatchRequestBody

	const id = (await params).id

	const entryData: { content?: string } = {}
	if (updates.content !== undefined) entryData.content = updates.content

	const analysisUpdates = updates.analysis
	const analysisUpsert = analysisUpdates
		? {
				upsert: {
					create: {
						mood: analysisUpdates.mood ?? 'neutral',
						summary: analysisUpdates.summary ?? '',
						color: analysisUpdates.color ?? '#ffffff',
						negative: analysisUpdates.negative ?? false,
					},
					update: {
						mood: analysisUpdates.mood ?? undefined,
						summary: analysisUpdates.summary ?? undefined,
						color: analysisUpdates.color ?? undefined,
						negative: analysisUpdates.negative ?? undefined,
					},
				},
		  }
		: undefined

	const entry = await prisma.journalEntry.update({
		where: { id },
		data: {
			...entryData,
			analysis: analysisUpsert,
		},
	})

	update(['/journal'])

	return NextResponse.json({ data: entry })
}
