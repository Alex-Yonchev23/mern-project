import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '../images/433496972_1088676695655663_4363006065331097707_n.jpg';
import image2 from '../images/433496972_1088676695655663_4363006065331097707_n.jpg';

export default function Gallery() {
  return (
    <main className='flex flex-col items-center pt-2 pb-5 gap-8 min-h-screen'>
      <section className="w-full p-5 pt-0 md:py-24 lg:py-32 bg-gray-950 text-gray-50 max-w-6xl rounded-xl big-shadow">
        <div className='flex justify-center'>
          <h1 className="max-w-4xl text-center text-sm md:text-xl font-bold mb-5 ml-5 uppercase bg-yellow-500 rounded-tl-none rounded-tr-none rounded-xl p-3">
            Опознайте света на металните скуптури, които носят история със себе си
          </h1>
        </div>
        <div className="container grid gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16 ">
          <div className="group relative overflow-hidden rounded-lg">
            <Link className="absolute inset-0 z-10" to="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Featured Artwork"
              className="aspect-[4/3] w-full rounded-lg object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              src={image1}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 bg-gradient-to-t from-gray-950 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ">Ethereal Embrace</h1>
                <p className="text-gray-400">By Jane Doe</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-yellow-500 uppercase">
                Ветеранът
              </h1>
              <p className="text-gray-400">By Jane Doe</p>
            </div>
            <p className="text-lg text-gray-400">
              Immerse yourself in the captivating world of "Ethereal Embrace," a masterpiece that transcends the
              boundaries of time and space. This breathtaking work of art, crafted by the renowned artist Jane Doe,
              invites you to embark on a journey of ethereal beauty and emotional resonance.
            </p>
          </div>
        </div>
      </section>


      <section className="w-full p-5 bg-gray-950 text-gray-50 max-w-6xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-yellow-500 text-center">
            Галерия
          </h1>
        </div>
        <div className="grid gap-6 px-4 md:px-6 lg:grid-cols-2 xl:grid-cols-3">
          <div className="group relative overflow-hidden rounded-lg">
            <Link className="absolute inset-0 z-10" to="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Artwork 1"
              className="aspect-[3/2] w-full rounded-t-lg object-cover group-hover:scale-105 transition-transform border-4 border-[#ffd700] group-hover:border-[#ffd700]/80"
              src={image2}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 bg-gradient-to-t from-gray-950 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Artwork 1</h3>
                <p className="text-gray-400">By Jane Doe</p>
              </div>
            </div>
          </div>
          {/* Add more artwork sections here */}
        </div>
      </section>
    </main>
  );
}
