import { Card } from 'flowbite-react';

export default function AlbumCards({ album }) {
    return(
        <div className='flex flex-wrap gap-4 justify-center p-2'>
            <Card
            className='max-w-sm h-[500px]'
            imgAlt={album.title}
            imgSrc={album.image} 
            >
                <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    {album.title}
                </h5>
            </Card>
        </div>
    );
}