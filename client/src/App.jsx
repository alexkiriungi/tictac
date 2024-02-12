import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Album from './pages/Album';
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import Photo from './pages/Photo';
import Profile from './pages/Profile';

export default function App() {
  return (
    
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/album' element={<Album />} />
          <Route path='/log-in' element={<Login />} />
          <Route path='/sign-up' element={<SignUp /> } />
          <Route path='/photo' element={<Photo />} />
          <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
