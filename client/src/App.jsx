import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/AboutUs';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Nav from './components/nav/index';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import ContactUs from './pages/ContactUs';
import Blog from './pages/Blog'


export default function App() {
  return (
    <BrowserRouter>
      { <Nav/>}
      <Routes>
        <Route path="/" element ={<Home/>} />
        <Route path="/log-in" element ={<LogIn/>} />
        <Route path="/sign-up" element ={<SignUp/>} />
        <Route path="/profile" element ={<Profile/>} />
        <Route path="/about-us" element ={<About/>} />
        <Route path="/services" element ={<Services/>} />
        <Route path="/gallery" element ={<Gallery/>} />
        <Route path="/contact-us" element ={<ContactUs/>} />
        <Route path="/blog" element ={<Blog/>} />


      </Routes>
    </BrowserRouter>
  )
}


