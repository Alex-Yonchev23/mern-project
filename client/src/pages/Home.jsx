import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import chameleon from '../images/Chameleon.png';
import veteran from '../images/Rooster.png';
import birdy from '../images/birdy-2.png';
import about from '../images/IMG_9214.jpeg';
import services from '../images/IMG_9182.jpeg';
import image1 from '../images/433496972_1088676695655663_4363006065331097707_n.jpg';
import image2 from '../images/433227450_927240098809648_6822573085754372008_n.jpg';
import image3 from '../images/433357013_811983277640692_616874915821996714_n.jpg';
import PostCard from '../components/PostCard';




export default function Home() {
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    try {
        const fetchRecentPosts = async () => {
            const res = await fetch('/server/blog/get-posts?limit=3');
            const data = await res.json();
            if (res.ok) {
               setRecentPosts(data.posts);
            } 
        };
        fetchRecentPosts();
    } catch (error) {
        
    }
}, []);


  return (
    <div className='min-h-screen'>
      <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
        <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid max-w-[1400px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
            <div className=''>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] dark:text-yellow-50 text-neutral-900">
                <span className='text-yellow-400'>Ironic:</span> Скулптуриране на изключителното
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-800 dark:text-gray-400  md:text-xl mt-4">
                Открийте завладяващия свят на Ironic, където металът се трансформира в зашеметяващи скулптури, които преосмислят границите на изкуството.
              </p>
              <div className="space-x-4 mt-6">
                <Link to={'/gallery'}>
                  <button
                    className="inline-flex h-10 items-center justify-center rounded-md bg-yellow-400 px-8 text-sm font-bold text-neutral-950 hover:bg-yellow-400/80 hover:rounded-xl transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Разгледайте галерията
                  </button>
                </Link>
                <Link to={'/contact-us'}>
                  <button
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-500 px-8 text-sm font-bold text-gray-50 hover:bg-gray-500/80 hover:rounded-xl transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  >
                    Свържете се с нас
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src={chameleon}
                alt="Кубичната гора"
                className="mx-auto w-full rounded-t-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-26 bg-black" id="about">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-neutral-600 text-yellow-50 px-3 py-1 text-sm dark:bg-gray-800">
                  За Ironic
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-yellow-50">
                  Създаване на изключителни метални скулптури
                </h2>
                <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed my-4">
                  Ironic е известен студио, посветено на създаването на завладяващи метални скулптури, които разширяват
                  границите на художественото изразяване. Водени от екип от опитни занаятчии, ние трансформираме суровите
                  материали в зашеметяващи произведения на изкуството, които предизвикват емоции и вдъхновяват възхищение.
                </p>
                <div className="space-x-4">
                  <Link to={'/about-us'}>
                    <button
                      className="inline-flex h-9 items-center justify-center rounded-md bg-yellow-50 px-4 py-2 text-sm font-bold text-neutral-950 hover:transition-all duration-200 hover:bg-yellow-50/80 hover:rounded-xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                      href="#"
                    >
                      Научете повече
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <img
              src={about}
              width="550"
              height="550"
              alt="За нас"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>


      <section className="w-full py-12 md:py-24 lg:py-32 bg-yellow-50 dark:bg-gray-800" id="gallery">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-neutral-950 px-3 py-1 text-sm dark:bg-gray-800 text-yellow-50">
                Галерия
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                Разгледайте Нашите Скулптурни Шедьоври
              </h2>
              <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Открийте завладяващия свят на металните скулптури на Ironic, където всяко произведение е доказателство за силата
                на художественото изразяване и красотата на металните занаяти.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-12">
            <img
              src={image1}
              width="400"
              height="400"
              alt="Скулптура 1"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center"
            />
            <img
              src={image2}
              width="400"
              height="400"
              alt="Скулптура 2"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center"
            />
            <img
              src={image3}
              width="400"
              height="400"
              alt="Скулптура 3"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center"
            />
          </div>
        </div>
      </section>


      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100" id="services">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-neutral-950 px-3 py-1 text-sm dark:bg-gray-800 text-yellow-50">
                Услуги
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-neutral-950">
                Превръщаме Вашето Художествено Виждане в Реалност
              </h2>
              <p className="max-w-[900px] text-gray-900 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                В Ironic предлагаме широка гама от услуги, които да ви помогнат да превърнете своите художествени идеи в
                зашеметяващи метални скулптури. От персонализиран дизайн до експертно изработване, ние сме тук, за да ви
                напътстваме на всяка стъпка от процеса.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold text-yellow-400">Персонализиран Дизайн</h3>
                    <p className="text-neutral-950">
                      Сътрудничете си с нашите талантливи дизайнери, за да вдъхнете живот на вашето уникално виждане. Ние ще
                      работим в тясно сътрудничество с вас, за да създадем уникална скулптура, която да отразява вашето
                      художествено изразяване.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold text-yellow-400">Изработка</h3>
                    <p className="text-neutral-950">
                      Нашите умели занаятчии използват съвременни металоработни техники, за да превърнат суровите материали в
                      зашеметяващи скулптури. От заваряване до финално обработване, ние гарантираме, че всеки детайл е
                      изпълнен с най-голяма прецизност.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold text-yellow-400">Инсталация</h3>
                    <p className="text-neutral-950">
                      Ние поемаме целия процес на инсталация, от подготовката на мястото до финалното поставяне, като
                      гарантираме, че вашата скулптура е сигурно и красиво изложена.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <img
              src={services}
              width="550"
              height="550"
              alt="Услуги"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-t from-transparent via-neutral-950/80 to-20% to-neutral-950" id="blog">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="space-y-2 text-center">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 text-gray-900">
                Блог
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-yellow-50">
                Открийте Нашите Най-нови Идеи
              </h2>
              <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Бъдете в крак с последните новини, тенденции и вдъхновения от света на металната скулптура. Нашият блог е съкровищница от идеи, уроци и истории зад кулисите.
              </p>
            </div>

            {recentPosts && recentPosts.length > 0 && (
              <div className="flex flex-col justify-center items-center mb-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
                  {recentPosts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
