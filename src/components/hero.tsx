/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/4Tp5LN1KdKS
 */
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full py-6 md:py-12 lg:py-16">
      <div className="container flex flex-col items-center justify-center px-4 space-y-4 md:px-6 md:flex-row md:space-y-0">
        <div className="flex flex-col gap-2 text-center md:gap-4 md:text-left">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            Welcome to Queer Reads
          </h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Discover LGBTQ+ books.
          </p>
          <Link
  className="mr-12 md:mt-10 inline-flex h-10 items-center rounded-md border border-gray-200 bg-white text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-black justify-center gap-1 px-2 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 text-white button-rainbow-glow"
  href="/search"
>
  Explore Books
  <ChevronRightIcon className="w-4 h-4" />
</Link>
        </div>
        <Image
          alt="Hero"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full md:order-last lg:aspect-square"
          height={275}
          src="https://media.giphy.com/media/3oz8xXfDRmzR0vQ7II/giphy.gif"
          width={550}
        />
      </div>
    </section>
  );
}

function ChevronRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}