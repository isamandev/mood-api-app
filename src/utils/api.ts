type FetchOptions = RequestInit & { json?: unknown }

async function fetchJSON(path: string, options: FetchOptions = {}) {
	const res = await fetch(path, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...(options.headers || {}),
		},
		body: options.json ? JSON.stringify(options.json) : options.body,
	})

	if (!res.ok) {
		const errorText = await res.text()
		throw new Error(`API error ${res.status}: ${errorText}`)
	}

	return res.json()
}

export const deleteEntry = async (id: string) => fetchJSON(`/api/entry/${id}`, { method: 'DELETE' })

export const newEntry = async () => fetchJSON('/api/entry', { method: 'POST', json: { content: 'new entry' } })

export const updateEntry = async (id: string, updates: Record<string, unknown>) => fetchJSON(`/api/entry/${id}`, { method: 'PATCH', json: { updates } })

export const askQuestion = async (question: string) => fetchJSON(`/api/question`, { method: 'POST', json: { question } })

export const fetcher = (url: string) => fetchJSON(url)
