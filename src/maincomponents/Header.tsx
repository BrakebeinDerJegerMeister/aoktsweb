import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <Flex align="center" justify="center" bg="blue.500" color="white" p={4}>
            <Heading as="h1" size="lg">
                <Link to="/">Mon super header</Link>
            </Heading>
        </Flex>
    );
};

export default Header;
