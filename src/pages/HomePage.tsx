// HomePagetsx
import React from 'react';
import { Box, Center, Text } from '@chakra-ui/react';
import { useFileHandler } from '../hooks/useFileHandler';

const HomePage: React.FC = () => {
  const { handleDragOver, handleDrop } = useFileHandler();



  return (
    <Box id="homepage" h="100%" w="100%" bg="gray.100" onDrop={handleDrop} onDragOver={handleDragOver}>
      <Center h="100%">
        <Text fontSize="xl">Glissez-déposez votre fichier ici</Text>
      </Center>
    </Box>
  );
};

export default HomePage;
