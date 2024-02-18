import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button, Spinner } from "flowbite-react";
import AlbumCard from "../components/AlbumCard";

export default function PublishPage() {
    const { postSlug } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ album, setAlbum ] = useState(null);
    const [ recentAlbums, setRecentAlbums ] = useState(null);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/album/getalbums?slug=${albumSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return
                } 
                if (res.ok) {
                    setAlbum(data.albums[0]);
                    setError(false);
                    setLoading(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchAlbum();
    }, [albumSlug]);

    useEffect(() => {
        try {
            const fetchRecentAlbums = async () => {
                const res = await fetch('/api/album/getalbums?limit=3');
                const data = await res.json();
                if (res.ok) {
                    setRecentAlbums(data.albums);
                }
            };
            fetchRecentAlbums();
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size='xl' />
            </div>
        )
    }
    return (
      <>
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto
            lg:text-4xl'>
                {album && album.title}
            </h1>
            <img src={album && album.image} alt={album && album.title} className="mt-10
            p-3 max-h-[600px] w-full object-cover" />

            <div className='flex flex-col justify-center items-center mb-5' >
                <h1 className='text-xl mt-5'>Recent Albums</h1>
                <div className='flex flex-wrap gap-5 mt-5 justify-center' >
                    {
                        recentAlbums &&
                            recentAlbums.map((album) => (
                                <AlbumCard key={album._id} album={album} />
                            ))
                    }
                </div>
            </div>
    </main>
    </>
)}