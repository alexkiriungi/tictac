import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';


export default function Header() {
    const path = useLocation().pathname;
    const { theme } = useSelector(state => state.theme);
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
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
        <Navbar className='border-b-2 shadow:md'>
            <Link to='/' className='self-center whitespace-nowrap text-sm
            sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-pink-500 
                via-indigo-500 to-purple-500 rounded-lg text-white'>Tic</span>
                Tac
            </Link>
            <div className='flex gap-4 md:order-2'>
                <Button className='w-12 h-10 inline' color='gray' pill onClick={() => 
                dispatch(toggleTheme())}
                >
                    { theme === 'light' ? <FaSun /> : <FaMoon />}
                </Button>
                { currentUser ? (
                    <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt='user'
                        img={currentUser.profilePicture}
                        rounded/>
                    }>
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignOut}>Log Out</Dropdown.Item>
                    </Dropdown>
                ):(
                <Link to='/log-in'>
                    <Button gradientDuoTone='purpleToBlue' outline>
                        Log In
                    </Button>
                </Link>
                ) }
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Link to='/'>
                    <Navbar.Link active={path === '/'} as={'div'}>
                        Home
                    </Navbar.Link>
                </Link>
                <Link to='/album'>
                    <Navbar.Link active={path === '/album'} as={'div'}>
                        Album
                    </Navbar.Link>
                </Link>
                <Link to='/photo'>
                    <Navbar.Link active={path === '/photo'} as={'div'}>
                        Photos
                    </Navbar.Link>
                </Link>
            </Navbar.Collapse>
        </Navbar>
    );
}