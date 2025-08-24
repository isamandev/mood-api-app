'use server'

import { revalidatePath } from 'next/cache'

export const update = async (paths: string[] = []) => {
	for (const path of paths) {
		revalidatePath(path)
	}
}
