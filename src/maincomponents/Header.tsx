// Header.tsx
import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useFileHandler } from '../hooks/useFileHandler';

const Header: React.FC = () => {

    const { handleDragOver, handleDrop } = useFileHandler();
    const navigate = useNavigate();

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
