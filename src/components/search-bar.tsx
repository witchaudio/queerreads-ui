'use client';
import { useState, useEffect, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from 'next/link';


export default function SearchBar() {


  interface Book {
    id: string;
    volumeInfo: {
      imageLinks?: {
        thumbnail: string;
      };
      title: string;
      authors?: string[];
      };
    }


    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const lgbtKeywords = ["LGBT", "lesbian", "gay", "bisexual", "transgender"];
    const maxResults = 10; // Adjust based on how many results you want to load per page
    const apiKey = process.env.NEXT_APP_GOOGLE_BOOKS_API_KEY || 'AIzaSyDZDK8N-Yy66KL-bbkohePKgKBbs2WqwYg';

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    const combinedQuery = `${searchQuery} ${lgbtKeywords.join(" OR ")}`;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(combinedQuery)}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apiKey}`;

    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const newBooks = data.items || [];

      const booksMap = new Map();
      [...searchResults, ...newBooks].forEach(book => booksMap.set(book.id, book));

  
      setSearchResults(Array.from(booksMap.values()));
      setStartIndex(prev => prev + maxResults);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, startIndex, searchResults, apiKey, lgbtKeywords]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) return;
      fetchBooks();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchBooks, isLoading]);

  const handleSearch = () => {
    setSearchResults([]);
    setStartIndex(0);
    fetchBooks();
  };

  const handleBookClick = (bookId:any) => {
    console.log(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
    localStorage.setItem('currentBookId', bookId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center">
        <h3 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
          Search Books 🔍
        </h3>
        
      </div>
  
      <div className="flex flex-col items-center w-full max-w-3xl mt-6">
  <div className="flex items-center space-x-2">
    <Input
      className="w-64 bg-transparent text-white border border-gray-300 focus:border-blue-500" // Adjusted width here
      placeholder="queer vibes only"
      type="search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <Button className="h-10 w-20 button-rainbow-glow" variant="outline" onClick={handleSearch}>
      Search
    </Button>
  </div>
</div>

  
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-5 w-full max-w-6xl pt-10">
      {searchResults.map((book) => (
        <Link href="/detailPage" passHref key={book.id}>
          <div className="flex flex-col items-center mb-4" onClick={() => handleBookClick(book.id)}>
            <Image
              src={book.volumeInfo.imageLinks?.thumbnail || '/placeholder.svg'}
              alt={`Cover of ${book.volumeInfo.title}`}
              width={100}
              height={150}
              className="rounded-lg"
            />
            <div>
              <h4 className="text-lg font-semibold">{book.volumeInfo.title}</h4>
              <p className="text-sm">{book.volumeInfo.authors?.join(', ')}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
      {isLoading && <p>Loading more books...</p>}
    </div>
  );
}  
