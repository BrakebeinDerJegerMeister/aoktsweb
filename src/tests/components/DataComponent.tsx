// components/DataComponent.tsx
import React, { useEffect, useState } from 'react';
import { DataService } from '../services/DataService';
import { UncompressedHeader } from '../models/UncompressedHeader';

export const DataComponent: React.FC = () => {
    const [header, setHeader] = useState<UncompressedHeader | null>(null);

    useEffect(() => {
        const buffer = /* obtenir ArrayBuffer du fichier ou d'une source */;
        const loadedHeader = DataService.loadHeader(buffer);
        setHeader(loadedHeader);
    }, []);

    return (
        <div>
            {header ? (
                <div>
                    <p>Version: {header.version}</p>
                    <p>Creator Name: {header.creatorName}</p>
                    {/* autres propriétés affichées ici */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
