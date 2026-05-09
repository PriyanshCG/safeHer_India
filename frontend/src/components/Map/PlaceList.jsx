import React from 'react';
import PlaceCard from './PlaceCard';

export default function PlaceList({ loading, pois }) {
    if (loading) {
        return <p className="font-body text-sm text-on-surface-variant text-center my-4">Locating sanctuaries...</p>;
    }

    if (pois.length === 0) {
        return <p className="font-body text-sm text-on-surface-variant text-center my-4">No safe places found nearby.</p>;
    }

    return (
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {pois.map(poi => (
                <PlaceCard key={poi.id} poi={poi} />
            ))}
        </div>
    );
}
