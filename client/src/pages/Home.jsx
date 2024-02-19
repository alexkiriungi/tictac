import AlbumCard from '../components/AlbumCard';

export default function Home() {
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className='txt-3xl font-bold lg:text-6xl'>Welcome to Tictac</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Your got-to destination for personalized and thoughtful
          card postings! At Tictac we believe that every message is 
          an opportunity to create a meaningful connection, and our
          platform is designed to make expressing your sentiments easy,
          delightful, and memorable!
        </p>
      </div>
      <AlbumCard />
    </div>
  )
}
