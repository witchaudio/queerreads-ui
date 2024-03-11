'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';


interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks?: {
      thumbnail: string;
    };
  };
}



function getRandomElement(array:any) {
  return array[Math.floor(Math.random() * array.length)];
}

export default function BookGrid() {
  const [books, setBooks] = useState<Book[]>([]);


  useEffect(() => {
    const lgbtKeywords = ["LGBT", "lesbian", "gay", "bisexual", "transgender", "queer"];
    const genreKeywords = ["romance", "fiction", "drama", "mystery", "fantasy", "sci-fi", "horror", "thriller", "poetry", "graphic novel", "young adult", "self-help", "health", "science", "art", "music", "sports","religion", "spirituality", "philosophy", "politics", "social science", "true crime", "humor", "comics", "games", "handbook", "film", "tv", "radio", "ebook", "comic", "art"];
    const excludedKeywords = ["children", "kids", "juvenile"];
    
    const randomLgbtKeyword = getRandomElement(lgbtKeywords);
    const randomGenreKeyword = getRandomElement(genreKeywords);
    const excludedQuery = excludedKeywords.map(kw => `-${kw}`).join(" ");

    const query = `${randomLgbtKeyword}+AND+${randomGenreKeyword}`;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=30&key=${apiKey}`;

    const fetchBooks = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setBooks(data.items || []);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setBooks([]);
      }
    };

    fetchBooks();
  }, []);

  const handleBookClick = (bookId: string) => {
    console.log(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
    localStorage.setItem('currentBookId', bookId); // Store the book ID in localStorage
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid lg:grid-cols-4 xl:grid-cols-6 gap-4 items-start justify-center max-w-6xl mx-auto px-4 pt-10 pb-10">
        {books.map(book => (
          <div key={book.id} onClick={() => handleBookClick(book.id)} className="cursor-pointer">
            <Link href="/detailPage" passHref>
              <div className="flex flex-col items-center space-y-2">
                <Image
                  alt={`Cover of ${book.volumeInfo.title}`}
                  className="aspect-5/8 object-cover rounded-lg border border-gray-200 w-full overflow-hidden dark:border-gray-800"
                  width={80}
                  height={120}
                  src={book.volumeInfo.imageLinks?.thumbnail || '/p-small.png'}
                  unoptimized={true}
                />
                <div className="grid gap-1">
                  <h3 className="text-md font-semibold tracking-tight">{book.volumeInfo.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}