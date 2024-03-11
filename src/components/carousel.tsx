'use client'
import { useEffect, useState } from 'react';
import { CardContent, Card } from "@/components/ui/card";
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel";
import Image from "next/image";

interface RelatedBook {
  id: string;
  title: string;
  author: string;
  cover: string;
  volumeInfo: {
    authors?: string[];
    categories?: string[];
  };
}

export default function RelatedBooksCarousel({ book }: { book: RelatedBook }) {
  const [relatedBooks, setRelatedBooks] = useState<RelatedBook[]>([]);

  useEffect(() => {
    if (!book || !book.volumeInfo) {
      console.log('No book or volume info here');
      return;
    }

    console.log('Current book:', book);

    const authors = book.volumeInfo.authors;
    const categories = book.volumeInfo.categories;

    let queryParts: string[] = [];

    // Check if there are authors and add them to the query
    if (authors && authors.length) {
      authors.forEach(author => {
        queryParts.push(`inauthor:"${author}"`);
      });
    }

    // Check if there are categories and add them to the query
    if (categories && categories.length) {
      categories.forEach(category => {
        queryParts.push(`subject:"${category}"`);
      });
    }

    // Combine the query parts with OR operator to broaden the search
    const combinedQuery = queryParts.join(' OR ');
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(combinedQuery)}&key=${apiKey}&maxResults=5`;
    console.log('API URL:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        const fetchedBooks = data.items?.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : "Unknown Author",
          cover: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '/placeholder.svg',
        })) || [];
        setRelatedBooks(fetchedBooks);
      })
      .catch(error => {
        console.error('Error fetching related books:', error);
      });
  }, [book]); // Dependency on the book prop to re-run this effect when the book changes

  useEffect(() => {
    console.log('Related books:', relatedBooks);
  }, [relatedBooks]);

  return (
    <div className="w-full max-w-sm mx-auto">
  <h3 className="text-xl font-semibold text-center my-4">Other LGBTQIA+ Books</h3>
  <Carousel className="w-full">
    <CarouselContent className="p-2">
      {relatedBooks.map((book: RelatedBook) => (
        <CarouselItem key={book.id}>
          <div className="flex flex-col items-center p-2">
            <Card>
              <CardContent className="p-2 flex flex-col items-center justify-center gap-2">
                <Image
                  alt={`Cover of ${book.title}`}
                  className="aspect-1x1 rounded-md object-cover"
                  height={192}
                  src={book.cover}
                  width={128}
                />
                <div className="text-sm text-center leading-none">
                  <h3 className="font-semibold">{book.title}</h3>
                  <p className="text-sm font-light leading-none">{book.author}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</div>

  );
}



 