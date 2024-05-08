import React from 'react';
import { Flex } from '@chakra-ui/react';
import Header from './maincomponents/Header';
import Footer from './maincomponents/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './maincomponents/AppRouter';

const App: React.FC = () => {
  return (
    <Router>
      <Flex direction="column" h="100vh">
        <Header />
        <Flex id="main" flex="1" direction="column" h="100%">
          <AppRouter />
        </Flex>
        <Footer />
      </Flex>
    </Router>
  );
};

export default App;
