// src/hooks/useFileHandler.ts

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export interface FileInfo {
    fileName: string;
    fileSize: number;
    fileType: string;
}
export interface FileData extends FileInfo {
    arrayBuffer: Uint8Array;
}

export const useFileHandler = () => {


    const [fileData, setFileData] = useState<FileData | null>(null);
    const navigate = useNavigate();

    const checkFileValidity = (file: File): boolean => {
        return file ? true : false;
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const file = event.dataTransfer.files[0];

        if (checkFileValidity(file)) {
            const reader = new FileReader();
            reader.onload = (e) => {
                console.clear();
                console.log(file)
                const arrayBuffer = e.target?.result as ArrayBuffer;
                setFileData({
                    "arrayBuffer": new Uint8Array(arrayBuffer),
                    "fileName": file.name,
                    "fileSize": file.size,
                    "fileType": file.type
                });
            };
            reader.readAsArrayBuffer(file);
        } else {
            console.error('Le fichier n\'est pas valide');
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const navigateToScenarioPage = () => {
        navigate('/scenario', { state: { fileData } });
    };

    useEffect(() => {
        if (fileData) {
            navigateToScenarioPage();
        }
    }, [fileData]);

    return { handleDragOver, handleDrop };
};
