import React from 'react';
import { FaShapes, FaHandHolding, FaWrench, FaUsers,FaKey, FaShieldAlt, FaDraftingCompass, FaRecycle  } from 'react-icons/fa';
import { IoIosConstruct } from "react-icons/io";
import { GiSolderingIron, GiChameleonGlyph } from "react-icons/gi";
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <div>
      <main className="w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-transparent via-neutral-950 to-60% to-neutral-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-yellow-50">Създаване на шедьоври от метал</h1>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Открийте нашата експертиза в създаването на впечатляващи желязни скулптури и метални конструкции, които пленяват и вдъхновяват.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="flex flex-col items-center group justify-center space-y-2 rounded-lg bg-yellow-50 p-6 shadow-sm transition-all transform hover:-translate-y-1 duration-300 hover:bg-yellow-50 dark:bg-gray-950 dark:hover:bg-neutral-700">
                  <GiChameleonGlyph className="h-8 w-8 text-neutral-950 group-hover:text-yellow-400 transition-all duration-300 dark:text-gray-400" />
                  <h3 className="text-lg font-semibold">Желязни скулптури</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Впечатляващи персонализирани желязни скулптури, които пленяват и вдъхновяват.
                  </p>
                </div>
                <div className="flex flex-col items-center group justify-center space-y-2 rounded-lg bg-yellow-50 p-6 shadow-sm transition-all transform hover:-translate-y-1 duration-300 hover:bg-yellow-50 dark:bg-gray-950 dark:hover:bg-neutral-700">
                  <IoIosConstruct className="h-8 w-8 text-neutral-950 group-hover:text-yellow-400 transition-all duration-300 dark:text-gray-400" />
                  <h3 className="text-lg font-semibold">Метални конструкции</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Иновативни и здрави метални конструкции за различни приложения.
                  </p>
                </div>
                <div className="flex flex-col items-center group justify-center space-y-2 rounded-lg bg-yellow-50 p-6 shadow-sm transition-all transform hover:-translate-y-1 duration-300 hover:bg-yellow-50 dark:bg-gray-950 dark:hover:bg-neutral-700">
                  <GiSolderingIron className="h-8 w-8 text-neutral-950 group-hover:text-yellow-400 transition-all duration-300 dark:text-gray-400" />
                  <h3 className="text-lg font-semibold">Услуги по заваряване</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Експертни услуги по заваряване за всички вашите нужди от метална обработка.
                  </p>
                </div>
                <div className="flex flex-col items-center group justify-center space-y-2 rounded-lg bg-yellow-50 p-6 shadow-sm transition-all transform hover:-translate-y-1 duration-300 hover:bg-yellow-50 dark:bg-gray-950 dark:hover:bg-neutral-700">
                  <FaUsers className="h-8 w-8 text-neutral-950 group-hover:text-yellow-400 transition-all duration-300 dark:text-gray-400" />
                  <h3 className="text-lg font-semibold">Персонализация</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Персонализирани решения, за да превърнете вашето метално виждане в реалност.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-28 bg-yellow-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Украсете вашето пространство с нашата метална експертиза
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  От интригуващи скулптури до функционални метални конструкции, нашият екип от умели артисти и инженери
                  превръща вашите идеи в реалност с прецизност и страст.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end self-center">
                <Link to={'/contact-us'}>
                  <button 
                    className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-950 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-neutral-800/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  >
                    Свържете се с нас
                  </button>
                </Link>

                <Link to={'/about-us'}>
                  <button
                    className="inline-flex h-10 items-center justify-center rounded-md border border-red-500 bg-yellow-50 px-8 text-sm font-medium all transition-colors hover:bg-neutral-500 focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  >
                    Научи повече
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-t from-transparent via-neutral-950 to-50% to-neutral-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-yellow-50">Нашето задължение към качеството</h2>
                <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Гордеем се с вниманието ни към детайла и ангажимента си да предоставяме изключителни резултати за всеки
                  проект.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="flex flex-col items-center group justify-center space-y-2 rounded-lg bg-yellow-50 p-6 shadow-sm transition-all transform hover:-translate-y-1 duration-300 hover:bg-yellow-50 dark:bg-gray-950 dark:hover:bg-neutral-700">
                  <FaKey className="h-8 w-8 text-neutral-950 group-hover:text-yellow-400 transition-all duration-300 dark:text-gray-400" />
                  <h3 className="text-lg font-semibold">Качествена изработка</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Нашите умели артисти се грижат, всеки един детайл да отговаря на най-високите стандарти.
                  </p>
                </div>
                <div className="flex flex-col items-center group justify-center space-y-2 rounded-lg bg-yellow-50 p-6 shadow-sm transition-all transform hover:-translate-y-1 duration-300 hover:bg-yellow-50 dark:bg-gray-950 dark:hover:bg-neutral-700">
                  <FaShieldAlt className="h-8 w-8 text-neutral-950 group-hover:text-yellow-400 transition-all duration-300 dark:text-gray-400" />
                  <h3 className="text-lg font-semibold">Издръжливи материали</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Използваме висококачествени материали, за да създадем издържливи метални изделия.
                  </p>
                </div>
                <div className="flex flex-col items-center group justify-center space-y-2 rounded-lg bg-yellow-50 p-6 shadow-sm transition-all transform hover:-translate-y-1 duration-300 hover:bg-yellow-50 dark:bg-gray-950 dark:hover:bg-neutral-700">
                  <FaDraftingCompass className="h-8 w-8 text-neutral-950 group-hover:text-yellow-400 transition-all duration-300 dark:text-gray-400" />
                  <h3 className="text-lg font-semibold">Прецизна инженерия</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Нашият екип от инженери осигурява внимателно изработени изделия.
                  </p>
                </div>
                <div className="flex flex-col items-center group justify-center space-y-2 rounded-lg bg-yellow-50 p-6 shadow-sm transition-all transform hover:-translate-y-1 duration-300 hover:bg-yellow-50 dark:bg-gray-950 dark:hover:bg-neutral-700">
                  <FaRecycle className="h-8 w-8 text-neutral-950 group-hover:text-yellow-400 transition-all duration-300 dark:text-gray-400" />
                  <h3 className="text-lg font-semibold">Устойчиви практики</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Ние отдаваме предимство на екологично приятни методи в нашата метална обработка.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
);
}