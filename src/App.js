import React from 'react';
import {ChakraProvider,theme,Box} from '@chakra-ui/react';
import Header from './Components/Header'
import Dashboard from './Pages/Dashboard'
import Homepage from './Pages/Home'
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
const mapStateToProps=state=>{
    return {
        users:state.users
    }
}
const mapDispatchToProps=dispatch=>({
})
function App(props) {
  return (
        <ChakraProvider theme={theme}>
          <Header/>
          <Box height="16"/>
            <Switch>
                <Route path='/dashboard'
                render={prop => {
                  return props.users.isloggedin  ? <Dashboard/> : <Redirect to="/"/>
                }}></Route>
                <Route path='/' exact={true}
                render={prop => {
                  return props.users.isloggedin  ? <Redirect to="/dashboard"/> : <Homepage/>
                }}></Route>
            </Switch>
        </ChakraProvider>
  );
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));