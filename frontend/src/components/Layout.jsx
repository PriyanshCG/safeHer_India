import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
    return (
        <div className="flex h-screen bg-surface overflow-hidden">
            <Sidebar />
            <div className="flex-1 md:ml-72 h-screen overflow-y-auto relative bg-surface">
                {children}
            </div>
        </div>
    );
}
