import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'

const Home = async () => {
	const { userId } = await auth()
	const href = userId ? '/journal' : '/new-user'
	return (
		<div className='w-full h-screen bg-black flex justify-center items-center text-white'>
			<div className='w-full max-w-[600px] mx-auto'>
				<div className='flex flex-col gap-1'>
					<h1 className='text-5xl sm:text-6xl mb-4 leading-tight font-bold'>ثبت و تحلیل احساسات</h1>
					<p className='text-xl sm:text-xl text-white/70 mb-6 font-thin'>
						این برنامه به شما کمک می‌کند تا حال و احساسات خود را در طول زمان دنبال کرده و بهتر بشناسید. فقط کافیست با خودتان صادق باشید.
					</p>
				</div>

				<div className='mt-6'>
					<Link href={href} className='bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-lg sm:text-xl'>
						شروع کن
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Home
