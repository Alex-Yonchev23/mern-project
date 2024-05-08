import React from 'react'

import { Link } from 'react-router-dom'

export default function Gallery() {
  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
    <div className="space-y-6 md:space-y-8 lg:space-y-10 bg-black md:p-8">
    <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Luxury Art Gallery</h1>
          <p className="mt-2 text-gray-500 max-w-[600px] mx-auto md:text-lg dark:text-gray-400">
            Explore our collection of exquisite fine art photography and paintings that capture the essence of luxury
            and sophistication.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <Link
            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-[0_0_20px_0_rgba(253,224,71,0.5)] transition-all duration-300 ease-in-out"
            href="#"
          >
            <img
              alt="Artwork 1"
              className="aspect-square object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out border border-yellow-50"
              height={600}
              src="/placeholder.svg"
              width={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
            <div className="absolute bottom-4 left-4 text-white text-sm font-medium">Luxury Sunset</div>
          </Link>
          <Link
            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-[0_0_20px_0_rgba(253,224,71,0.5)] transition-all duration-300 ease-in-out"
            href="#"
          >
            <img
              alt="Artwork 2"
              className="aspect-square object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out border border-yellow-50"
              height={600}
              src="/placeholder.svg"
              width={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
            <div className="absolute bottom-4 left-4 text-white text-sm font-medium">Elegant Cityscape</div>
          </Link>
          <Link
            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-[0_0_20px_0_rgba(253,224,71,0.5)] transition-all duration-300 ease-in-out"
            href="#"
          >
            <img
              alt="Artwork 3"
              className="aspect-square object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out border border-yellow-50"
              height={600}
              src="/placeholder.svg"
              width={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
            <div className="absolute bottom-4 left-4 text-white text-sm font-medium">Timeless Elegance</div>
          </Link>
          <Link
            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-[0_0_20px_0_rgba(253,224,71,0.5)] transition-all duration-300 ease-in-out"
            href="#"
          >
            <img
              alt="Artwork 4"
              className="aspect-square object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out border border-yellow-50"
              height={600}
              src="/placeholder.svg"
              width={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
            <div className="absolute bottom-4 left-4 text-white text-sm font-medium">Refined Minimalism</div>
          </Link>
          <Link
            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-[0_0_20px_0_rgba(253,224,71,0.5)] transition-all duration-300 ease-in-out"
            href="#"
          >
            <img
              alt="Artwork 5"
              className="aspect-square object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out border border-yellow-50"
              height={600}
              src="/placeholder.svg"
              width={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
            <div className="absolute bottom-4 left-4 text-white text-sm font-medium">Opulent Landscapes</div>
          </Link>
          <Link
            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-[0_0_20px_0_rgba(253,224,71,0.5)] transition-all duration-300 ease-in-out"
            href="#"
          >
            <img
              alt="Artwork 6"
              className="aspect-square object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out border border-yellow-50"
              height={600}
              src="/placeholder.svg"
              width={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
            <div className="absolute bottom-4 left-4 text-white text-sm font-medium">Serene Moments</div>
          </Link>
          <Link
            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-[0_0_20px_0_rgba(253,224,71,0.5)] transition-all duration-300 ease-in-out"
            href="#"
          >
            <img
              alt="Artwork 7"
              className="aspect-square object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out border border-yellow-50"
              height={600}
              src="/placeholder.svg"
              width={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
            <div className="absolute bottom-4 left-4 text-white text-sm font-medium">Architectural Gems</div>
          </Link>
          <Link
            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-[0_0_20px_0_rgba(253,224,71,0.5)] transition-all duration-300 ease-in-out"
            href="#"
          >
            <img
              alt="Artwork 8"
              className="aspect-square object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out border border-yellow-50"
              height={600}
              src="/placeholder.svg"
              width={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
            <div className="absolute bottom-4 left-4 text-white text-sm font-medium">Captivating Portraits</div>
          </Link>
        </div>
    </div>
  </main>
  )
}