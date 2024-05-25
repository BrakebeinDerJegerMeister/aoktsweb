import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
// Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.ts'

// Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
