import React from 'react';
import { Avatar } from 'flowbite-react';
import ironic from '../images/433227450_927240098809648_6822573085754372008_n.jpg';
import founder_profile_image from '../images/IMG_9184.jpeg';
import founder_image from '../images/IMG_9187.jpeg';
import our_mission from '../images/IMG_9204.jpeg'

export default function AboutUs() {
  return (
    <main className="flex flex-col gap-12 px-4 py-5 md:px-6 md:py-16 lg:px-8 lg:py-20  text-yellow-50 min-h-screen">
      <section className="grid gap-8 lg:grid-cols-[600px_1fr] lg:gap-12 xl:gap-16 rounded-xl bg-neutral-950 p-5 white-shadow">
        <img
          alt="About Us"
          className=" overflow-hidden rounded-xl object-cover object-center"
          src={ironic}
        />
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl  tracking-tighter sm:text-4xl md:text-5xl ">За <span className=' font-bold text-yellow-400'>Ironic</span></h2>
            <div className="inline-block rounded-lg bg-neutral-600 px-3 py-1 text-sm dark:bg-gray-800">
              Основана през 2024
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar img={founder_profile_image} rounded size="md" className='h-10 w-10 rounded-full object-cover hover: hover:ring-2 hover:ring-yellow-100 hover:ring-offset-2 hover:ring-offset-neutral-900 hover:golden-shadowgolden-shadow transition-all duration-400' >
              </Avatar> 
              <div>
                <h3 className="text-xl font-semibold text-yellow-50 hover:text-yellow-50/80">Тодор Цолов</h3>
                <p className="text-gray-500 dark:text-gray-400 font-bold text-sm ">Основател</p>
              </div>
            </div>
            <p className="text-gray-400 dark:text-gray-400">
              Тодор Цолов is the founder and CEO of Ironic, a leading provider of innovative software solutions. With
              over 15 years of experience in the tech industry, John has a proven track record of building successful
              companies and driving innovation. Under his leadership, Acme Inc. has become a trusted partner for
              businesses of all sizes, helping them streamline their operations and unlock new growth opportunities.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_500px] lg:gap-12 xl:gap-16 rounded-xl bg-neutral-950 p-5 white-shadow">
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl text-yellow-50 font-bold tracking-tighter sm:text-4xl md:text-5xl mb-2">За Основателя</h2>
            <div className="inline-block rounded-lg text-yellow-50 bg-neutral-600 px-3 py-1 text-sm dark:bg-gray-800">
              Как започна всичко?
            </div>
          </div>
          <p className="text-gray-400 dark:text-gray-400">
              Като дете често помагах в работилницата на баща ми. Той беше член на съюза на художниците и на задружния цех на майсторите. Работеше с най-различни материали и тогава се сблъсках с поръчки от всякакво естество, от арт произведения до мебели и конструкции.
          </p>
          <p className="text-gray-400 dark:text-gray-400">
            По-късно завърших средно образование в Техникума по дървообработване и вътрешна архитектура, което ми помогна да затвърдя познанията си за работа с машини, обработка на материали и прецизна изработка на детайли.
            Към днешна дата, повече от тридесет години се занимавам в сферата на интериорното строителство и дизайна, което ме обогати допълнително с технически познания и прецизност към детайла.
          </p>
          <p className="text-gray-400 dark:text-gray-400">
            През последните години неугасващият интерес към скулптурирането от метал ме върна обратно в детството. Сега, с натрупания опит от всичките ми начинания, искам да предам онази магия, до която се докоснах едва когато бях осем-годишен в работилницата на баща ми, на децата си, на техните приятели и на всеки, който има нужда и желание да се докосне до нея.
          </p>
        </div>
        <img
          alt="Founder's image"
          className="aspect-square overflow-hidden rounded-xl object-cover object-center"
          height={500}
          src={founder_image}
          width={500}
        />
      </section>

      <section className="grid gap-8 lg:grid-cols-[500px_1fr] lg:gap-12 xl:gap-16 rounded-xl bg-neutral-950 p-5 white-shadow">
        <img
          alt="Our Mission"
          className="aspect-square overflow-hidden rounded-xl object-cover object-center -scale-x-100	"
          height={500}
          src={our_mission}
          width={500}
        />
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Mission</h2>
            <div className="inline-block rounded-lg bg-neutral-600 px-3 py-1 text-sm dark:bg-gray-800">
              Empowering Businesses
            </div>
          </div>
          <p className="text-gray-400 dark:text-gray-400">
            At Acme Inc., our mission is to empower businesses of all sizes with cutting-edge software solutions that
            drive efficiency, productivity, and growth. We believe that technology should be a strategic asset, not a
            burden, and we are committed to helping our clients leverage the power of innovation to achieve their goals.
          </p>
          <p className="text-gray-400 dark:text-gray-400">
            Our team of experienced professionals is dedicated to understanding the unique needs of each client and
            tailoring our solutions to meet their specific requirements. We take pride in our ability to deliver
            exceptional results, and we are constantly exploring new ways to push the boundaries of what's possible in
            the world of business technology.
          </p>
        </div>
      </section>

      

      
    </main>
  );
}
