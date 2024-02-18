import { Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashAlbums() {
  const { currentUser } = useSelector((state) => state.user);
  const [ userAlbums, setUserAlbums ] = useState([]);
  const [ showMore, setShowMore ] = useState(true);
  
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await fetch(`/api/album/getalbums?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserAlbums(data.albums);
          if (data.albums.length < 9) {
            setShowMore(false);
          }
        } else {
          console.log(data.message)
        }
        console.log(data)
      } catch (error) {
        console.log(error.message)
      }
    };
    fetchAlbums();  
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userAlbums.length;
    try {
      const res = await fetch(`/api/album/getalbums?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserAlbums((prev) => [...prev, ...data.albums]);
        if (data.albums.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar 
      scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 
      dark:scrollbar-thumb-500'>
      {currentUser && userAlbums.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date posted</Table.HeadCell>
              <Table.HeadCell>Album title</Table.HeadCell>
              <Table.HeadCell>Album image</Table.HeadCell>
            </Table.Head>
            {userAlbums.map((album) => (
              <Table.Body className='divide-y' key={album._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    { new Date(album.updatedAt).toLocaleDateString() }
                  </Table.Cell>    
                  <Table.Cell>
                    <Link className='font-medium text-gray-900 dark:text-white' to={`/album/${album.slug}`}>{album.title}</Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/album/${album.slug}`}>
                      <img 
                        src={album.image}
                        alt={album.title} 
                        className='w-20 h-10 object-cover bg-gray-500 rounded' />
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {
            showMore && (
              <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7' >
                show more
              </button>
            )
          }
        </>
      ) : (
        <div className='flex justify-center items-center'>
          <p>Fetching Albums... Please wait:</p>
        </div>
      )}
    </div>
  );
}