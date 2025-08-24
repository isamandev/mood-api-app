// app/(dashboard)/layout.tsx
import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

const links = [{ name: 'دفترچه ها', href: '/journal' }]

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const user = await currentUser()

	return (
		<div className='w-screen h-screen relative' dir='rtl'>
			<aside className='absolute right-0 top-0 h-full w-[200px] border-l border-black/10'>
				<div className='flex items-center px-4 border-b border-black/10 h-[60px]'>
					<span className='text-2xl font-bold'>حال و هوا</span>
				</div>
				<div>
					<ul className='px-4'>
						{links.map(link => (
							<li key={link.name} className='text-xl my-4'>
								<Link href={link.href}>{link.name}</Link>
							</li>
						))}
					</ul>
				</div>
			</aside>

			<div className='mr-[200px] h-full w-[calc(100vw-200px)]'>
				<header className='h-[60px] border-b border-black/10'>
					<nav className='px-4 h-full'>
						<div className='flex items-center justify-end h-full'>
							{user && (
								<span className='text-md ml-2 mt-1'>
									{user.firstName} {user.lastName}
								</span>
							)}
							<UserButton />
						</div>
					</nav>
				</header>
				<div className='h-[calc(100vh-70px)]'>{children}</div>
			</div>
		</div>
	)
}

export default DashboardLayout
