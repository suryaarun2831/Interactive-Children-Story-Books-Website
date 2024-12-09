import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import About from '../About/About';
import Contact from '../Contact/Contact';
import Dashboard from '../Dashboard/Dashboard';
import PaintBox from '../Doodles/PaintBox';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Loginpage from '../Login/Loginpage';
import Navbar from '../Navbar/Navbar';
import ProfilePage from '../Profile/Profile';
import Question from '../Quiz/Question';
import Quiz from '../Quiz/Quiz';
import Result from '../Quiz/Result';
import Register from '../Register/Register';
import SpeechToTextComponent from '../SpeechToVoice/SpeechToTextComponent';
import Books from '../Stories/Books';
import Stories from '../Stories/Stories';
import User from '../Users/User';
import ProtectedRoute from './ProtectedRoute';

const Router = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/register'];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={<ProtectedRoute element={<Home />} allowedRoles={['user', 'admin']} />}
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} allowedRoles={['user', 'admin']} />}
          />
          <Route
            path="/about"
            element={<ProtectedRoute element={<About />} allowedRoles={['user', 'admin']} />}
          />
          <Route
            path="/contact"
            element={<ProtectedRoute element={<Contact />} allowedRoles={['user', 'admin']} />}
          />
          <Route
            path="/quiz"
            element={<ProtectedRoute element={<Quiz />} allowedRoles={['user', 'admin']} />}
          />
          <Route
            path="/question"
            element={<ProtectedRoute element={<Question />} allowedRoles={['user', 'admin']} />}
          />
          <Route
            path="/result"
            element={<ProtectedRoute element={<Result />} allowedRoles={['user', 'admin']} />}
          />
          <Route
            path="/story-page"
            element={<ProtectedRoute element={<Stories />} allowedRoles={['user', 'admin']} />}
          />
          <Route
            path="/books"
            element={<ProtectedRoute element={<Books />} allowedRoles={['admin']} />}
          />
          <Route
            path="/user"
            element={<ProtectedRoute element={<User />} allowedRoles={['admin']} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<ProfilePage />} allowedRoles={['user', 'admin']} />}
          />
          <Route
            path="/doodle"
            element={<ProtectedRoute element={<PaintBox />} allowedRoles={['user']} />}
          />
          <Route path='/speech' element={<ProtectedRoute element={<SpeechToTextComponent/>}/>} allowedRoles={['user','admin']}/>
        </Routes>
      </div>
      {!hideNavbarRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

export default Router;
