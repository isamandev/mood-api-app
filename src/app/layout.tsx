import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const vazirMatn = Vazirmatn({
	variable: '--font-vazirmatn',
	subsets: ['arabic'],
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'ثبت احساسات',
	description: 'با این اپلیکیشن می‌تونی احساسات و حالات روزانه‌ات رو پیگیری و تحلیل کنی. فقط کافیه با خودت صادق باشی.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider>
			<html lang='fa' dir='rtl'>
				<body className={`${vazirMatn.variable} antialiased`}>{children}</body>
			</html>
		</ClerkProvider>
	)
}
