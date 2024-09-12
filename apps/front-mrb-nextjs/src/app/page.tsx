import Image from "next/image";
import ScrollIntoView from "@/components/ScrollIntoView/ScrollIntoView";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <div className="mt-8">
        <ScrollIntoView hashName="#home" offset="-90px" />
      </div>
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/meeting-room.jpg"
          alt="meeting room"
          width={400}
          height={300}
          priority
        />
      </div>
      <ScrollIntoView hashName="#about" offset="-90px" />
      {/* About component */}
      <div className="min-h-screen bg-repeat	 bg-[url('/work-laptop.jpg')] parallax-background">
        <div className="max-w-full-content mx-auto box-content pt-2">
          <div className="max-w-[400px] pt-10 pb-2">
            <h2 className="uppercase text-7xl leading-tight py-7">
              Meet The Coach
            </h2>
            <section className="font-open-sans-condensed text-base text-stone-300 tracking-wider">
              <p className="py-3">
                {`Hi, I’m Joey Dixon and I’m a boxing coach with 15 years of boxing experience and 9 intercontinental cruiserweight titles. 
                I’ve trained many successful boxers at national and international levels. I love teaching people how to box like a pro,
                whether they are beginners or advanced fighters.
                `}
              </p>
              <p className="py-3">
                {`To me, boxing is not only a sport, but also a way of life.
                It teaches you discipline, resilience, confidence, and self-defense. It also keeps you fit, healthy, and mentally sharp.
                That’s why I created this business to share my knowledge and skills with you.`}
              </p>
              <p className="py-3">
                {`I have a friendly and supportive approach that will make you feel comfortable and motivated.
                I also have a wealth of experience and expertise that will make you learn faster and better.
                No matter what your age, level, or background, I can help you become the best boxer you can be.`}
              </p>
              <p className="py-3">
                {`If you are interested in working with me or learning more about me, please feel free to contact me or browse through my website.
                I look forward to hearing from you and helping you on your boxing journey.`}
              </p>
            </section>
            <section className="mt-5">
              <ul
                aria-label="Social Bar"
                className="flex gap-2 invert -ml-3 items-center"
              >
                <li>
                  <a
                    href="http://www.facebook.com/wix"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      width={43}
                      height={43}
                      alt="Facebook"
                      src="https://unsplash.com/fr/photos/logo-IPIwk-Ox1A0"
                    />
                  </a>
                </li>
                {/* <li>
                  <a
                    href="https://www.x.com/wix"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      width={28}
                      height={28}
                      src="https://static.wixstatic.com/media/2be684_ea277e5149dc4b86ab826475d4d64c41~mv2.png"
                      alt="X"
                    />
                  </a>
                </li> */}
                <li>
                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      /* width={43}
                      height={43} */
                      src="https://unsplash.com/fr/photos/icone-3XNkyD2aiII"
                      alt="Instagram"
                    />
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
        <section className="bg-[url('https://unsplash.com/fr/photos/ensemble-de-table-en-bois-brun-m2RFkLGL8Qs')] bg-center bg-cover">
          <div className="max-w-full-content px-4 mx-auto text-black">
            <h2 className="title pt-24 pb-20 tracking-[.3em] text-center">
              My Experience
            </h2>
            {/* <ul className="grid grid-cols-2 lg:grid-cols-4 gap-16 pb-20 px-2">
              <AchievementItem
                title="15"
                tagline="15 YEARS OF BOXING EXPERIENCE"
              />
              <AchievementItem
                title="3"
                tagline="3 TIMES WBA INTERCONTINENTAL CRUISERWEIGHT"
              />
              <AchievementItem
                title="4"
                tagline="4 TIMES WBC INTERCONTINENTAL CRUISERWEIGHT"
              />
              <AchievementItem
                title="2"
                tagline="2 TIMES IBF INTERCONTINENTAL CRUISERWEIGHT"
              />
            </ul> */}
          </div>
        </section>
        <section className="bg-gray-c2">
          <div className="max-w-full-content px-4 mx-auto py-20 flex flex-col gap-10 items-center">
            <h3 className="text-3xl uppercase tracking-[.4em] pt-7">
              Start Training Today
            </h3>
            <a
              className="btn-secondary px-10 text-lg px-7"
              href="/classes-schedule"
            >
              Book a Session
            </a>
          </div>
        </section>
        {/* <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <GalleryItem item={item} key={item.id} />
          ))}
        </section> */}
      </div>
      <ScrollIntoView hashName="#contact" offset="-90px" />
      {/* Contact section */}
      {/* <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div> */}
    </main>
  );
}
