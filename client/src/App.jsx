import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Album from './pages/Album';
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import Photo from './pages/Photo';
import PublishPage from './pages/PublishPage';
import Header from './components/Header';
import FooterComp from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/album' element={<Album />} />
          <Route path='/log-in' element={<Login />} />
          <Route path='/sign-up' element={<SignUp /> } />
          <Route  element={<PrivateRoute /> } >
            <Route path='/dashboard' element={<Dashboard /> } />
          </Route>
          <Route path='/photo' element={<Photo />} />
          <Route path='/publishpage' element={<PublishPage />} />
      </Routes>
      <FooterComp />
    </BrowserRouter>
  );
}
