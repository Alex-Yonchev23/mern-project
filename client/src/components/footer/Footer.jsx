import { Footer } from 'flowbite-react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import logo from '../../images/i-logo.png';

export default function FooterComponent() {
  return (
    <Footer className='mt-14 border-t-8 border-yellow-400 bg-yellow-50'>
      <div className="w-full">
        <div className="grid grid-cols-2 gap-8 px-6 py-8 md:grid-cols-2">
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
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Flowbite</Footer.Link>
                <Footer.Link href="#">Tailwind CSS</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Github</Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <div className="w-full bg-black px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Ironic" year={new Date().getFullYear()} />
          <div className="flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
