import React, { useEffect, useState } from 'react';
import { Box, Center, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [fileData, setFileData] = useState<Uint8Array | null>(null);
  const navigate = useNavigate();

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    // Exemple de validation de fichier
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
  };

  const checkFileValidity = (): boolean => {
  //const checkFileValidity = (file: File): boolean => {
    // Fonction de validation du fichier
    // Vous pouvez implémenter votre logique de validation ici
    return true;
  };

  useEffect(() => {
    if (fileData) {
      navigateToScenarioPage();
    }
  }, [fileData, navigate]);

  const navigateToScenarioPage = () => {
    navigate('/scenario', { state: { fileData } });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Box id="homepage" h="100%" w="100%" bg="gray.100"  onDrop={handleDrop} onDragOver={handleDragOver}>
      <Center h="100%">
        <Text fontSize="xl">Glissez-déposez votre fichier ici</Text>
      </Center>
    </Box>
  );
};

export default HomePage;
