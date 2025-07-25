import Loading from '@/app/loading'
import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
	return (
		<div className='w-full h-screen bg-black flex justify-center items-center'>
			<div className='w-full max-w-md mx-auto px-4'>
				<SignUp fallback={<Loading />} />
			</div>
		</div>
	)
}

export default SignUpPage
