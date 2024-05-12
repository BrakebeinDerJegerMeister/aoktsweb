import React, { useEffect, useState } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {

    const [fileData, setFileData] = useState<Uint8Array | null>(null);
    const navigate = useNavigate();

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const file = event.dataTransfer.files[0];


        const checkFileValidity = (): boolean => {
            return true;
        };

        if (checkFileValidity()) {
            // if (file.type === 'application/pdf' && checkFileValidity(file)) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const arrayBuffer = e.target?.result as ArrayBuffer;
                setFileData(new Uint8Array(arrayBuffer));
            };
            reader.readAsArrayBuffer(file);
        } else {
            console.error('Le fichier n\'est pas valide');
        }
    }
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    useEffect(() => {
        if (fileData) {
            navigateToScenarioPage();
        }
    }, [fileData]);

    const navigateToScenarioPage = () => {
        navigate('/scenario', { state: { fileData } });
    };

    const handleHeaderClick = () => {
        // Navigate with empty state to ensure no data persists
        navigate('/', { state: {} });
    };

    return (
        <Flex align="center" justify="center" bg="blue.500" color="white" p={4} onClick={handleHeaderClick} onDrop={handleDrop} onDragOver={handleDragOver}>
            <Heading as="h1" size="lg">
               Mon super header
            </Heading>
        </Flex>
    );
};

export default Header;
