import { Spinner } from 'flowbite-react';

export default function Photo() {
  return (
    <div className='min-h-screen'>
      <div className='flex justify-center items-center flex-wrap gap-2'>
      <Spinner color='info' />
      <p className='italic'>Fetching Available Photos, Please wait...</p>
    </div>
    </div>
  )
}
