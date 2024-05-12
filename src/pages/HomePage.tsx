import React, { useEffect, useState } from 'react';
import { Box, Center, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [fileData, setFileData] = useState<Uint8Array | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifie si l'URL est la racine et réinitialise fileData
    if (location.pathname === '/') {
      console.log("Retour demandé");
      setFileData(null);
    }
  }, [location]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    console.log("@@@ DROP @@@@")
    event.preventDefault();
    event.stopPropagation()
    const file = event.dataTransfer.files[0];

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
    return true;
  };

  useEffect(() => {
    if (fileData) {
      console.log("@@@ Navigate @@@")
      navigateToScenarioPage();
    }
  }, [fileData]);

  const navigateToScenarioPage = () => {
    navigate('/scenario', { state: { fileData } });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation()
  };

  return (
    <Box id="homepage" h="100%" w="100%" bg="gray.100" onDrop={handleDrop} onDragOver={handleDragOver}>
      <Center h="100%">
        <Text fontSize="xl">Glissez-déposez votre fichier ici</Text>
      </Center>
    </Box>
  );
};

export default HomePage;
