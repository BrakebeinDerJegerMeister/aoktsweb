import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

const Header: React.FC = () => {
  return (
    <Flex align="center" justify="center" bg="blue.500" color="white" p={4}>
      <Heading as="h1" size="lg">
        Mon super header
      </Heading>
    </Flex>
  );
};

export default Header;
