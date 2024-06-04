import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '../images/433496972_1088676695655663_4363006065331097707_n.jpg';
import image2 from '../images/433227450_927240098809648_6822573085754372008_n.jpg';
import image3 from '../images/433357013_811983277640692_616874915821996714_n.jpg';


import { PhotoProvider, PhotoView } from 'react-photo-view';
import { FaSearch } from 'react-icons/fa';

export default function Gallery() {
  const images = [image1, image2, image3];


  return (
    <main className='flex flex-col  pt-2 pb-5 gap-8 min-h-screen px-2'>
      
      <section className="w-full p-5 pt-0 md:py-24 lg:py-32 bg-gray-950 text-gray-50 max-w-7xl rounded-xl white-shadow self-center">
        <div className='flex justify-center'>
          <h1 className="max-w-4xl text-center text-sm md:text-xl font-bold mb-5 ml-5 uppercase bg-yellow-400 rounded-tl-none rounded-tr-none rounded-xl p-3">
            Опознайте света на металните скуптури, които носят история със себе си
          </h1>
        </div>
        <div className="container grid gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="group relative overflow-hidden rounded-lg">
          <PhotoProvider>
            <PhotoView src={image1}>
                <div className='bg-neutral-950 rounded-lg relative group'>
                    <img
                        src={image1}
                        alt="Recent image"
                        className='w-fit mx-auto max-h-96 my-3 object-cover rounded-lg group-hover:opacity-70 transition-all duration-300 '
                    />
                    <div className='absolute inset-0 justify-center items-center hidden cursor-pointer group-hover:flex transition-all'>
                        <div className='bg-neutral-950 p-3  rounded-lg hover:bg-neutral-800 transition-all duration-200'>
                            <span className='text-gray-500'><FaSearch/></span>
                        </div>
                    </div>
                </div>
            </PhotoView>
            </PhotoProvider>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-yellow-400 uppercase">
                Ветеранът
              </h1>
              <p className="text-gray-400">От Тодор Цолов</p>
            </div>
            <p className="text-lg text-gray-400 indent-8">
              Претърпял десетилетия в битки, ветеранът продължава да вярва в смисъла на своята мисия. С всяка избита буря той извлича поука, укрепваща неговия дух и решимост. Неговите спомени са като ръкавици, които носи с гордост, изпълнени с истории на смелост и посветеност. Въпреки загубата на едното си грило в битка и механичното протезиране, той продължава да върви напред с гордост и достойнство, превръщайки своите уязвимости в източник на сила и воля за живот.
            </p>
          </div>
        </div>
      </section>


      <section className="w-full p-5 bg-gray-950 text-gray-50 bg-gradient-to-r from-transparent via-black md:to-70% to-50% to-transparent self-center rounded-lg">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-yellow-400 text-center mb-5">
            Галерия
          </h1>
        </div>
        <div className="grid gap-6 px-4 md:px-6 lg:grid-cols-3 ">
            <PhotoProvider>
              {images.map((image, index) => (
                <PhotoView key={index} src={image}>
                  <div className='bg-neutral-950 rounded-lg relative group h-fit'>
                    <img
                      src={image}
                      alt={`Recent image ${index + 1}`}
                      className='aspect-[/3] my-3 object-cover rounded-lg group-hover:opacity-70 transition-all duration-300'
                    />
                    <div className='absolute inset-0 justify-center items-center hidden cursor-pointer group-hover:flex transition-all'>
                      <div className='bg-neutral-950 p-3 rounded-lg hover:bg-neutral-800 transition-all duration-200'>
                        <span className='text-gray-500'><FaSearch/></span>
                      </div>
                    </div>
                  </div>
                </PhotoView>
              ))}
            </PhotoProvider>
          </div>
        </section>
    </main>
  );
}
