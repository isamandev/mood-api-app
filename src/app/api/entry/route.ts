import { NextResponse } from 'next/server'
import { prisma } from '@/utils/db'
import { getUserFromClerkID } from '@/utils/auth'
import { update } from '@/utils/actions'

interface PostRequestBody {
	content: string
}

export const POST = async (request: Request) => {
	try {
		const data = (await request.json()) as PostRequestBody

		const user = await getUserFromClerkID()
		if (!user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const entry = await prisma.journalEntry.create({
			data: {
				content: data.content,
				user: { connect: { id: user.id } },
				analysis: {
					create: {
						mood: 'Neutral',
						summary: 'None',
						color: '#0101fe',
						negative: false,
					},
				},
			},
			include: { analysis: true },
		})

		update(['/journal'])

		return NextResponse.json({ data: entry })
	} catch (err) {
		console.error(err)
		return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
	}
}
