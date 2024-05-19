import { Footer } from 'flowbite-react';
import logo from '../images/i-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faViber, faPinterestP } from '@fortawesome/free-brands-svg-icons';

export default function FooterComponent() {
  return (
    <Footer className='bg-yellow-50'>
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 gap-8 px-6 py-8 md:grid-cols-2 justify-between">
          <div>
            <Footer.Brand
              href="#"
              src={logo}
              alt="Flowbite Лого"
              name="Ironic"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-2 sm:grid-cols-3 sm:gap-6 md:gap-5">
            <div>
              <Footer.Title title="За нас" className='font-semibold text-slate-800'/>
              <Footer.LinkGroup col>
                <Footer.Link href="#">За скулпторa</Footer.Link>
                <Footer.Link href="#">С какво се занимаваме?</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Последвайте ни в:" className='font-semibold text-slate-800'/>
              <Footer.LinkGroup col>
                <Footer.Link href="#">Инстаграм</Footer.Link>
                <Footer.Link href="#">Фейсбук</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Общи условия" className='font-semibold text-slate-800'/>
              <Footer.LinkGroup col >
                <Footer.Link href="#">Политика за поверителност</Footer.Link>
                <Footer.Link href="#">Условия и правила</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <div className="w-full bg-neutral-950 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Ironic" year={new Date().getFullYear()} />
          <div className="flex space-x-6 max-sm:mt-4 sm:mt-0 sm:justify-center text-neutral-500">
            <FontAwesomeIcon icon={faInstagram} className="text-2xl hover:text-yellow-50 transition-all duration-300" />
            <FontAwesomeIcon icon={faFacebook} className="text-2xl hover:text-yellow-50 transition-all duration-300" />
            <FontAwesomeIcon icon={faViber} className="text-2xl hover:text-yellow-50 transition-all duration-300" />
            <FontAwesomeIcon icon={faPinterestP} className="text-2xl hover:text-yellow-50 transition-all duration-300" />
          </div>
        </div>
      </div>
    </Footer>
  );
}
