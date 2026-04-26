import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <h1 className="font-headline text-6xl text-primary font-bold mb-4">404</h1>
            <p className="font-body text-xl text-on-surface-variant mb-8">
                We couldn't find the page you're looking for.
            </p>
            <Link to="/" className="bg-[#8B4A6A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6B2A4A] transition">
                Return Home
            </Link>
        </div>
    );
}
