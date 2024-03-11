import Hero from "../components/hero";
import BookGrid from "../components/book-grid";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <BookGrid />
    </div>
  )
}
