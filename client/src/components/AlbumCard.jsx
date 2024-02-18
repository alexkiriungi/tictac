import { Link } from "react-router-dom";

export default function AlbumCard({ post }) {
  return (
    <div className="group relative w-full h-[400px] overflow-hidden rounded-lg sm:w-[350px] border border-teal-500 hover:border-2 transition-all">
        <Link to={`/album/${album.slug}`}>
            <img 
            src={album.image} 
            alt="Album image" 
            className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"/>
        </Link>
        <div className="p-3 flex flex-col gap-2">
            <p className="text-lg font-semibold line-clamp-2">{album.title}</p>
            <Link to={`/album/${album.slug}`} className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2">
                View Album
            </Link>
        </div>
    </div>
  );
}