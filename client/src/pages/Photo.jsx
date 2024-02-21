import { Spinner } from 'flowbite-react';
import { useSelector } from 'react-redux';
import AlbumCards from '../components/AlbumCards';
import { useState, useEffect } from 'react';

export default function Photo() {
  const { currentUser } = useSelector(state => state.user);
  const [ albums, setAlbums ] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const res = await fetch('/api/album/getalbums');
      const data = await res.json();
      setAlbums(data.albums);
    };
    fetchAlbums();
  }, []);
  return (
    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
      {
        currentUser && albums && albums.length > 0 ? (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>
              Recent Cards
            </h2>
            <div className='flex flex-wrap gap-4'>
              {albums.map((album) => (
                <AlbumCards key={album._id} album={album} />
              ))}
            </div>
          </div>
        ) : (
          <div className='min-h-screen'>
            <div className='flex justify-center items-center flex-wrap gap-2'>
              <Spinner color='info' />
              <p className='italic'>Fetching Available Photos, Please wait...</p>
            </div>
          </div>
        )
      }
    </div>
  );
}
