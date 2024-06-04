import React, { useState } from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faViber, faPinterestP } from '@fortawesome/free-brands-svg-icons';
import { errorMessage, successMessage } from '../components/ToastMessage';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/server/contact/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });        
      
      const data = await res.json();

      if (res.ok) {
          successMessage('Form submitted successfully');
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
          });
      } else {
        errorMessage(data.message);
      }
    } catch (error) {
      errorMessage(error.message);
    }
  };

  return (
    <main className='px-2 min-h-screen'>
      <div className="max-w-7xl my-4 container border-yellow-500 border-4 rounded-lg overflow-hidden p-4">
        <div className="flex flex-col md:flex-row">
          <div className="flex justify-center items-center flex-1 border-y-0 border-r-0 border-solid border-yellow-500 overflow-hidden bg-gradient-to-tr md:bg-gradient-to-r from-black via-black md:via-black/80 md:to-90% to-70% to-black/0">
            <div className="px-5">
              <h1 className="text-yellow-50 text-4xl font-bold mt-3 mb-3 md:mb-5">Свържете се с нас</h1>
              <p className="text-gray-400 text-lg mb-3">Добре дошли в нашия свят на изящни метални скулптури! Свържете се с нас, ако имате въпроси или ако искате да внесете уникално произведение на изкуството в своето пространство.</p>
              <p className="text-gray-400 text-lg mb-5">Търсите персонализирана метална скулптура? Свържете се, за да обсъдим вашите идеи и ще си сътрудничим, за да превърнем вашата визия в реалност.</p>
              <div className="flex justify-between items-center mb-8 flex-wrap gap-3">
                <div className="flex items-center min-w-fit">
                  <div className='p-3 bg-yellow-50 rounded-full mr-5'>
                    <FaPhone className="fa-solid text-yellow-400 text-2xl"/>
                  </div>
                  <div className="">
                    <h1 className="text-yellow-50 text-lg">Обадете ни се</h1>
                    <a href="tel:0881234567" className="text-yellow-400 font-bold hover:text-yellow-400/80 transition duration-300 text-lg">088 123 4567</a>
                  </div>
                </div>
                <div className="right-info flex items-center">
                  <div className='p-3 bg-yellow-50 rounded-full mr-5'>
                    <FaEnvelope className="fa-solid text-yellow-400 text-2xl"/>
                  </div>
                  <div className="">
                    <h1 className="text-yellow-50 text-lg">Имейл</h1>
                    <a href="mailto:ironic@gmail.com" className="text-yellow-400 font-bold hover:text-yellow-400/80 hover:underline transition duration-300 text-lg">ironic@gmail.com</a>
                  </div>
                </div>
              </div>
              <ul className="social-icons flex items-center mb-5">
                <li className="mr-5"><a href="#"><FontAwesomeIcon icon={faInstagram} className="text-yellow-50 text-2xl hover:text-yellow-400 transition duration-300" /></a></li>
                <li className="mr-5"><a href="#"><FontAwesomeIcon icon={faFacebook} className="text-yellow-50 text-2xl hover:text-yellow-400 transition duration-300" /></a></li>
                <li className="mr-5"><a href="#"><FontAwesomeIcon icon={faViber} className="text-yellow-50 text-2xl hover:text-yellow-400 transition duration-300" /></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faPinterestP} className="text-yellow-50 text-2xl hover:text-yellow-400 transition duration-300" /></a></li>
              </ul>
            </div>
          </div>
          <div className="flex-1 p-5 border-b-0 border-l-0 border-solid border-yellow-500 bg-gradient-to-bl from-black via-black to-55% to-black/0">
            <h1 className="text-center text-yellow-400 text-3xl font-bold mb-2">Форма за контакт</h1>
              <h3 className="text-center text-gray-400 text-sm font-bold mb-4 max-w-xl">Не се колебайте да се свържете! Ние ще ви помогнем да превърнете вашата визия в реалност.</h3>

              <form method="post" id="contactForm" onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Две имена" 
                  className="mb-4 w-full px-4 py-2 bg-neutral-950/80 text-yellow-50 border border-gray-700 rounded transition duration-300 hover:ring-yellow-500 focus:ring-yellow-500"
                  onChange={handleChange}
                  value={formData.name} 
                />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Имейл адрес" 
                  className="mb-4 w-full px-4 py-2 bg-neutral-950/80 text-yellow-50 border border-gray-700 rounded transition duration-300 hover:ring-yellow-500 focus:ring-yellow-500"
                  onChange={handleChange}
                  value={formData.email} 
                />
                <input 
                  type="text" 
                  name="phone" 
                  placeholder="Телефонен номер" 
                  className="mb-4 w-full px-4 py-2 bg-neutral-950/80 text-yellow-50 border border-gray-700 rounded transition duration-300 hover:ring-yellow-500 focus:ring-yellow-500"
                  onChange={handleChange}
                  value={formData.phone} 
                />
                <textarea 
                  name="message" 
                  placeholder="Напишете съобщение..." 
                  rows="4" 
                  className="mb-4 w-full px-4 py-2 bg-neutral-950/80 text-yellow-50 border border-gray-700 rounded resize-none transition duration-300 hover:ring-yellow-500 focus:ring-yellow-500"
                  onChange={handleChange}
                  value={formData.message} 
                ></textarea>
                <button 
                  type="submit" 
                  id="sendButton" 
                  className="w-full py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-400/80 transition duration-300"
                >
                  Изпрати съобщение
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
  );
}

