// HomePagetsx

import React from 'react';
import { Box, Center, Flex, Image, Text } from '@chakra-ui/react';
import { useFileHandler } from '@hooks/useFileHandler';

const HomePage: React.FC = () => {
  const { handleDragOver, handleDrop } = useFileHandler();



  return (
    <Box id="homepage" flexGrow={1} bg="gray.100" display="flex" flexDirection="column">
      <Center>
        <Flex direction={['column', 'column', 'row']} wrap="wrap" justifyContent="space-evenly">
          {[
            { src: '/ageicons/DLC/IconeExtensionAoE2_TheAgeOfKings.webp', title: 'Age of Kings' },
            { src: '/ageicons/DLC/IconeExtensionAoE2_TheConquerors.webp', title: 'The Conquerors' },
            { src: '/ageicons/DLC/IconeExtensionAoE2_HDEdition.webp', title: '2013 HD' },
            { src: '/ageicons/DLC/IconeExtensionAoE2_DefinitiveEdition.webp', title: 'Definitive Edition' }
          ].map(item => (
            <Flex key={item.title}
              direction="column"
              alignItems="center"
              m="2"
              bg="white"
              boxShadow="md"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="lg"
              p="4"
              flex="1 1 200px" // Adaptatif, avec une base de 200px
              maxWidth="250px"  // Maximum de 250px par carte
              minHeight="200px"
            >
              <Image src={item.src} mb="3" boxSize="100px" objectFit="cover" />
              <Text fontWeight="bold">{item.title}</Text>
            </Flex>
          ))}
        </Flex>
      </Center>
      <Flex flexGrow={1} flexDirection="column" justify="center" onDrop={handleDrop} onDragOver={handleDragOver}>
        <Center w="100%">
          <Text fontSize="xl">
            Glissez-déposez votre fichier ici
          </Text>
        </Center>
      </Flex>
    </Box>
  );
};

export default HomePage;
