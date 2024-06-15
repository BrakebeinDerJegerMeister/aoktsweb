// HomePagetsx
import React from 'react';
import { Box, Center, Flex, Image, Text } from '@chakra-ui/react';
import { useFileHandler } from '@hooks/useFileHandler';

const HomePage: React.FC = () => {
  const { handleDragOver, handleDrop } = useFileHandler();



  return (
    <Box id="homepage" flexGrow={1} bg="gray.100" display="flex" flexDirection="column">
      <Flex direction={['column', 'column', 'row']} wrap="wrap" justifyContent="space-evenly">
        {[
          { src: 'public/ageicons/DLC/IconeExtensionAoE2_TheAgeOfKings.webp', title: 'Age of Kings' },
          { src: 'public/ageicons/DLC/IconeExtensionAoE2_TheConquerors.webp', title: 'The Conquerors' },
          { src: 'public/ageicons/DLC/IconeExtensionAoE2_HDEdition.webp', title: '2013 HD' },
          { src: 'public/ageicons/DLC/IconeExtensionAoE2_DefinitiveEdition.webp', title: 'Definitive Edition' }
        ].map(item => (
          <Flex key={item.title} direction={['column', 'column', 'row', 'row']} alignItems="center" m="2">
            <Image src={item.src} mr="2" />
            <Text>{item.title}</Text>
          </Flex>
        ))}
      </Flex>
      <Flex flexGrow={1} flexDirection="column" justify="center">
        <Center w="100%">
          <Text fontSize="xl" onDrop={handleDrop} onDragOver={handleDragOver}>
            Glissez-déposez votre fichier ici
          </Text>
        </Center>
      </Flex>
    </Box>
  );
};

export default HomePage;
