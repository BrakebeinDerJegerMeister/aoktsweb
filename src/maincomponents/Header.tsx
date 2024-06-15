// Header.tsx
import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useFileHandler } from '../hooks/useFileHandler';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {

    const { handleDragOver, handleDrop } = useFileHandler();
    const navigate = useNavigate();

    const handleHeaderClick = () => {
        // Navigate with empty state to ensure no data persists
        navigate('/', { state: {} });
    };
    const { t } = useTranslation("translation");

    return (
        <Flex align="center" justify="center" bg="blue.500" color="white" p={4}  wrap="wrap" onDrop={handleDrop} onDragOver={handleDragOver}>
            <Heading as="h1" size="lg" onClick={handleHeaderClick}>
                {t('headerTxt')}
            </Heading>
            <LanguageSwitcher ml="auto" />
        </Flex>
    );
};

export default Header;
