import AlbumCard from '../components/AlbumCard';

export default function Home() {
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className='txt-3xl font-bold lg:text-6xl'>Welcome to Tictac</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Tictac is a file sharing platform where users get to share memories,
          wallpapers, snaps and many more! Let us recreate your imagination
          and make it real!
        </p>
      </div>
      <AlbumCard />
    </div>
  )
}
