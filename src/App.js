import React from 'react';
import {ChakraProvider,theme,Box} from '@chakra-ui/react';
import Header from './Components/Header'
import Home from './Pages/Home'
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Header/>
      <Box height="16"/>
      <Home/>
    </ChakraProvider>
  );
}

export default App;
