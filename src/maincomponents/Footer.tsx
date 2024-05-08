import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Flex align="center" justify="center" bg="gray.500" color="white" p={4}>
      <Text>
        Mon super footer - © 2024
      </Text>
    </Flex>
  );
};

export default Footer;
