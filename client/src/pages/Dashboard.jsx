import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashUsers from '../components/DashUsers';
import DashAlbums from '../components/DashAlbums';
import DashPhotos from '../components/DashPhotos';

export default function Dashboard() {
  const location = useLocation();
  const [ tab, setTab ] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="md:w-56">
        {/* Sidebar Items */}
        <DashSidebar />
      </div>
      {/* Other Sidebad content */}
      {/* DashProfile */}
      {tab === 'profile' && <DashProfile />}
      {/* Users List */}
      {tab === 'users' && <DashUsers />}
      {/* Album List */}
      {tab === 'albums' && <DashAlbums />}
      {/* Photos list */}
      {tab === 'photos' && <DashPhotos />}
    </div>
  )
}
