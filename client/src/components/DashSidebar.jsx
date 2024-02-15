import { Sidebar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { BiPhotoAlbum } from 'react-icons/bi';
import { HiUser, HiArrowSmRight, HiPhotograph } from 'react-icons/hi';
import { FaUserFriends } from 'react-icons/fa';

export default function DashSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);
    const [ tab, setTab ] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    },[location.search]);
    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST'
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(error.message)
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                {
                    currentUser && (
                        <>  
                            <Link to='/dashboard?tab=profile'>
                            <Sidebar.Item
                            active={tab === 'profile'}
                            icon={HiUser}
                            label='User'
                            labelColor='dark'
                            as='div'
                            >
                                Profile
                            </Sidebar.Item>
                            </Link>

                            <Link to='/dashboard?tab=users'>
                            <Sidebar.Item
                            active={tab === 'users'}
                            icon={FaUserFriends}
                            as='div'
                            >
                                Users
                            </Sidebar.Item>
                            </Link>
                        
                            <Link to='/dashboard?tab=album'>
                            <Sidebar.Item
                            active={tab === 'album'}
                            icon={BiPhotoAlbum}
                            as='div'
                            >
                                Album
                            </Sidebar.Item>
                            </Link>
                        
                            <Link to='/dashboard?tab=photo'>
                            <Sidebar.Item
                            active={tab === 'photo'}
                            icon={HiPhotograph}
                            as='div'
                            >
                                Photo
                            </Sidebar.Item>
                            </Link>
                        </>
                    )
                }
                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'
                onClick={handleSignOut}>
                    Log Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  );
}
