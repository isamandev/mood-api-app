import { auth } from '@clerk/nextjs/server'
import { prisma } from './db'

export const getUserFromClerkID = async (select = { id: true }) => {
	const session = await auth()
	const userId = session.userId

	if (!userId) {
		throw new Error('Unauthorized: No Clerk user ID found')
	}

	const user = await prisma.user.findUniqueOrThrow({
		where: { clerkId: userId },
		select,
	})

	return user
}
