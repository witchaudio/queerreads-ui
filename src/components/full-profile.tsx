'use client'
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { db, auth, getFirestore } from '../firebase'; // Ensure you export firestore from your firebase config
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Login from '@/components/login';
import { User } from "firebase/auth";

interface Book {
  id: string;
  title: string;
  authors: string[];
  // You can expand this interface based on the data structure you have
}

export default function FullProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [toReadList, setToReadList] = useState<Book[]>([]);
  const [customLists, setCustomLists] = useState<Book[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserLists(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserLists = async (userId: string) => {
    try {
      const userRef = collection(db, 'users', userId, 'lists'); // use db from your firebase config
      const customListsSnapshot = await getDocs(userRef);
      setCustomLists(customListsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book)));
    } catch (error) {
      console.error("Error fetching user lists: ", error);
    }
  };
  

  if (!user) {
    return <Login />;
  }

  console.log("Favorites: ", favorites);
  console.log("To-Read List: ", toReadList);
  console.log("Custom Lists: ", customLists);
  return (
    <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-white lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <Package2Icon className="h-6 w-6" />
              <span className="">QUEERREADS</span>
            </Link>
            
          </div>
          <div className="flex-1 overflow-auto py-2 bg-white">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="/"
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <BookIcon className="h-4 w-4" />
                Favorites
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <BookIcon className="h-4 w-4" />
                To-Read List
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <BookIcon className="h-4 w-4" />
                New List
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
          
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-white px-6">
          <Link className="lg:hidden flex items-center gap-2 font-semibold" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="">QUEERREADS</span>
          </Link>
          <nav className="hidden lg:flex lg:flex-1 lg:gap-4 lg:justify-between lg:items-center lg:px-4">
            
            <Link className="font-medium" href="/login">
              Login
            </Link>
          </nav>
          
        </header>
        <main className="flex flex-1 flex-col p-4 md:gap-4 md:p-6 bg-white">
  <div className="flex flex-col items-center gap-2 md:flex-row md:items-start md:gap-4 lg:gap-2">
    {user ? (
      <>
        <div className="order-2 md:order-1">
          <Image
            alt="Avatar"
            className="rounded-full border-4 object-cover"
            height={80}
            src={user.photoURL || "/placeholder.svg"}
            width={80}
          />
        </div>
        <div className="order-1 md:order-2 text-center md:text-left">
          <h1 className="font-semibold text-2xl md:text-3xl">{user.displayName || "No Name"}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email || "No Email"}</p>
        </div>
      </>
    ) : (
      <p className="text-sm text-gray-500 dark:text-gray-400">Please log in to view your profile information.</p>
    )}
  </div>
</main>

      </div>
    </div>
  )
}


function Package2Icon(props:any) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}



function HomeIcon(props:any) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function BookIcon(props:any) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}

