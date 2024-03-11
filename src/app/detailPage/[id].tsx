// pages/books/[id].js
import { useRouter } from 'next/router';
import Image from "next/image";
import { useEffect, useState } from 'react';

export default function BookDetailPage() {
  const router = useRouter();
  const { id } = router.query; // Access the dynamic part of the URL

  const [book, setBook] = useState(null);

  useEffect(() => {
    async function fetchBookDetails() {
      if (!id) return; // Check if the id is there, if not, exit the function

      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('Fetching book details failed:', error);
        // Handle the error accordingly
      }
    }

    fetchBookDetails();
  }, [id]); // Effect runs when the `id` changes

  if (!book) {
    return <div>Loading...</div>; // Loading state or placeholder
  }

return (
    <div className="container">
        <h1>{(book as any)?.volumeInfo?.title}</h1>
        <Image
            src={(book as any)?.volumeInfo?.imageLinks?.thumbnail || '/no-image-placeholder.png'}
            alt={(book as any)?.volumeInfo?.title}
            width={200}
            height={300}
            layout="fixed"
        />
        <p>{(book as any)?.volumeInfo?.description || 'No description available.'}</p>
        {/* Add more details as needed */}
    </div>
);
}

