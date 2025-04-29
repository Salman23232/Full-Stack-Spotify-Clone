import { SignIn } from '@clerk/clerk-react'

const page = () => {
  return (<div className='min-h-screen w-full flex justify-center items-center bg-white dark:bg-blue-950'>
    <SignIn/>
  </div>
  )
}

export default page


