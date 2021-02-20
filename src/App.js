import React from 'react';
import {ChakraProvider,theme,Box} from '@chakra-ui/react';
import Header from './Components/Header'
import Homepage from './Pages/Home'
import {Provider} from 'react-redux';
import {configStore} from '../src/shared/store';
import {BrowserRouter} from 'react-router-dom';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
const store=configStore();
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <Header/>
          <Box height="16"/>
            <Switch>
                <Route path='/' component={()=><Homepage/>}></Route>
                <Redirect to="/"></Redirect>
            </Switch>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  );
}


export default App;
