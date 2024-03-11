'use client'
import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase'; // Adjust the path based on where your firebase-config.js is
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [error, setError] = useState('');

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Handle the successful authentication here (e.g., redirect or state update)
    } catch (error) {
      console.error(error);
      setError('Failed to login with Google. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="mx-auto max-w-sm bg-white shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login to QueerReads</CardTitle>
          <CardDescription>Login with your Google account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button className="w-full button-rainbow-glow" variant="outline" onClick={loginWithGoogle}>
              Login with Google
            </Button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
