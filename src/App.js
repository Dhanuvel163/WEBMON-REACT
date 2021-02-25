import React from 'react';
import {ChakraProvider,theme,Box,SkeletonCircle,SkeletonText,Skeleton} from '@chakra-ui/react';
import Header from './Components/Header'
import Dashboard from './Pages/Dashboard'
import Homepage from './Pages/Home'
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
const mapStateToProps=state=>{
    return {
        users:state.users,
        loading:state.loading
    }
}
const mapDispatchToProps=dispatch=>({
})
function App(props) {
  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker.register("/sw.js").catch(err => console.error("Service worker registration failed", err))
  //   } else {
  //     console.log("Service worker not supported")
  //   }
  // }, [])
  return (
        <ChakraProvider theme={theme}>
          <Header/>
          <Box height="16"/>
          {
            props.loading.loading ?
            <Box display="flex" width="full" alignContent="center" justifyContent="center" padding="10">
                <Box>
                    <SkeletonCircle size="20" />
                    <SkeletonText mt="4" mb="4" noOfLines={4} spacing="4" />
                    <Skeleton height="200px" width="300px"></Skeleton>
                </Box>
            </Box>
            :
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
          }
        </ChakraProvider>
  );
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));