import { Footer } from 'flowbite-react';
import {  BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import logo from '../../images/i-logo.png';

export default function FooterComponent() {
  return (
    <Footer className=' bg-yellow-50'>
      <div className="w-full mx-auto border-t-4 border-indigo-500 ">
        <div className="grid grid-cols-1 gap-8 px-6 py-8 md:grid-cols-2 justify-between">
          <div>
            <Footer.Brand
              href="#"
              src={logo}
              alt="Flowbite Logo"
              name="Ironic"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-2 sm:grid-cols-3 sm:gap-6 md:gap-5">
            <div>
              <Footer.Title title="About" className='font-semibold text-slate-800'/>
              <Footer.LinkGroup col>
                <Footer.Link href="#">Flowbite</Footer.Link>
                <Footer.Link href="#">Tailwind CSS</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" className='font-semibold text-slate-800'/>
              <Footer.LinkGroup col>
                <Footer.Link href="#">Instagram</Footer.Link>
                <Footer.Link href="#">Facebook</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" className='font-semibold text-slate-800'/>
              <Footer.LinkGroup col >
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <div className="w-full bg-black px-4 py-6 sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright href="#" by="Ironic" year={new Date().getFullYear()} />
          <div className="flex space-x-6 max-sm:mt-4 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
