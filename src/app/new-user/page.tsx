// app/new-user/page.tsx
import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import type { User as PrismaUser } from '@/generated/prisma'

const ensureUserExists = async (): Promise<PrismaUser> => {
	const user = await currentUser()

	if (!user) {
		throw new Error('No authenticated user found')
	}

	return prisma.user.upsert({
		where: { clerkId: user.id },
		update: {
			email: user.emailAddresses[0]?.emailAddress,
			firstName: user.firstName ?? null,
			lastName: user.lastName ?? null,
			imageUrl: user.imageUrl ?? null,
		},
		create: {
			clerkId: user.id,
			email: user.emailAddresses[0]?.emailAddress ?? '',
			firstName: user.firstName ?? null,
			lastName: user.lastName ?? null,
			imageUrl: user.imageUrl ?? null,
		},
	})
}

const NewUser = async () => {
	await ensureUserExists()
	redirect('/journal')
}

export default NewUser
