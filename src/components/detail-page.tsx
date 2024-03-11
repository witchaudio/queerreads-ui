"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import RelatedBooksCarousel from "./carousel";

export default function DetailPage() {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const bookId = localStorage.getItem("currentBookId");
    if (bookId) {
      fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        .then(response => response.json())
        .then(data => {
          setBook(data);
        })
        .catch(error => {
          console.error("Error fetching book details:", error);
        });
    }
  }, []);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid md:grid-cols-2 items-center gap-6 max-w-4xl px-4 mx-auto py-6 md:py-12 pb-8"> {/* Added bottom padding */}
  <div className="space-y-4">
    <h1 className="text-2xl font-bold tracking-tight lg:text-3xl xl:text-4xl">
      {(book as any)?.volumeInfo?.title}
    </h1>
    <div className="prose prose-gray max-w-none not-italic text-sm lg:text-base">
      <p>
        {(book as any)?.volumeInfo?.description || "No description available."}
      </p>
    </div>
  </div>
  <div className="flex justify-center items-center">
    <Image
      alt={(book as any)?.volumeInfo?.title}
      className="aspect-[3/4] object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
      height={300} // Reduced height
      src={
        (book as any)?.volumeInfo?.imageLinks?.thumbnail ||
        "/placeholder-cover.png"
      }
      width={200} // Width remains the same, maintaining the aspect ratio
    />
  </div>
  <RelatedBooksCarousel book={book} />
</div>

  );
}
