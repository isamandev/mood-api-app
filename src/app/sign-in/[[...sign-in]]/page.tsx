import Loading from '@/app/loading'
import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
	return (
		<div className='w-full h-screen bg-black flex justify-center items-center'>
			<div className='w-full max-w-md mx-auto px-4'>
				<SignIn fallback={<Loading />} />
			</div>
		</div>
	)
}

export default SignInPage
