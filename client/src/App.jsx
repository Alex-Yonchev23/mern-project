import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React, { useState } from 'react';
import Home from './pages/Home';
import About from './pages/AboutUs';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Nav from './components/Nav';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import ContactUs from './pages/ContactUs';
import ScrollToTop from './components/ScrollToTop';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import PostPage from './pages/PostPage';
import ToastMessage from './components/ToastMessage';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import 'flowbite';
import EditPost from './components/EditBlogPost';
//import SessionExpiredModal from './components/SessionExpiredModal';



export default function App() {

  const [isSessionExpired, setIsSessionExpired] = useState(false);

    const handleCloseSessionExpiredModal = () => {
        setIsSessionExpired(false);
    };


  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
        <Routes>  
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute/>}>
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/edit-post/:postId" element={<EditPost />} />
          </Route>
          {/*<Route path="/blog/:slug" component={PostDetail} />*/}
          <Route path="/about-us" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postSlug" element={<PostPage />} />

        </Routes>
      <Footer/>
      {/*<SessionExpiredModal isOpen={isSessionExpired} onClose={handleCloseSessionExpiredModal} />*/}
      <ToastMessage></ToastMessage>
    </BrowserRouter>
  );
}