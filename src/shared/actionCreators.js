import * as  actionTypes from './actionTypes';
import {baseUrl} from './url';
import {isloggedin,getuser} from '../service/userservice';

function fetchFunc(url,option,dispatch){
    dispatch(load())
    return new Promise((resolve,reject)=>{
        fetch(url,option)
        .then((res)=>{
            if(res.ok){
                return res;
            }else{
                var error=new Error('Error'+res.status+res.statusText)
                error.res=res;
                throw error;
            }
        },
        (error)=>{
            throw new Error(error.message)
        })
        .then(res=> res.json())
            .then(Response=>{
            if(Response.success){
                resolve(Response)
            }else{
                reject(Response.message)
            }
        })
        .catch((error)=>{
                reject(error.message)
        })
    })
    
}

//User Signup and login

export const postusersignup=(name,email,password,mobile,history)=>(dispatch)=>{
    var newuser={
            name:name,
            email:email,
            password:password,
            mobile:mobile
    }
    newuser.date = new Date().toISOString();
    return fetchFunc(baseUrl+'api/useraccounts/signup',{
        method: "POST",
        body:JSON.stringify(newuser),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    },dispatch)
    .then(Response=>{
        if(Response.success){
            localStorage.setItem('token',Response.token)
            localStorage.setItem('islawyer',false)
            localStorage.setItem('name',Response.name)
            // dispatch(fetchprofiledata())
            // dispatch(fetchallcases())
            // dispatch(fetchusercases())
            // dispatch(fetchuserdata())
            history.push("/home");
            // displaySuccess(dispatch,'You are logged in as User')
        }
    })
    // .catch((error)=>{
    //     displayError(dispatch,error)
    // }).finally(()=>{dispatch(clearLoading())})
}

export const postusersignin=(email,password,history)=>(dispatch)=>{
    var newuser={
            email:email,
            password:password,
    }
    return fetchFunc(baseUrl+'api/useraccounts/login',{
        method: "POST",
        body:JSON.stringify(newuser),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    },dispatch)
    .then(Response=>{
        if(Response.success){
            localStorage.setItem('token',Response.token)
            localStorage.setItem('islawyer',false)
            localStorage.setItem('name',Response.name)
            // dispatch(fetchprofiledata())
            // dispatch(fetchallcases())
            // dispatch(fetchusercases())
            // dispatch(fetchuserdata())
            history.push("/home");
            // displaySuccess(dispatch,'You are logged in as User')
        }
    })
    // .catch((error)=>{
    //     displayError(dispatch,error)
    // }).finally(()=>{dispatch(clearLoading())})
}

//Maintaining user logged in

export const fetchuserdata=()=>(dispatch)=>{
    dispatch(adduserdata());
}

export const adduserdata=()=>{
    if(isloggedin()){
        return{
            type:actionTypes.ISUSERLOGGEDIN,
            payload:{
                isloggedin:true,
                user:getuser().name,
                islawyer:false
            }
        }
    }else{
        return{
            type:actionTypes.USERLOGGEDOUT,
            payload:{
                isloggedin:false,
            }
        }
    }
}

//Edit Profile

export const fetchprofiledata=()=>(dispatch)=>{
    dispatch(addprofileloading(true))
    if(isloggedin()){
        return fetch(baseUrl+'api/useraccounts/profile',{headers: {'authorization':localStorage.getItem('token')}})
        .then((res)=>{
            if(res.ok){
                return res;
            }else{
                var error=new Error('Error'+res.status+res.statusText)
                error.res=res;
                throw error;
            }
        },
        (error)=>{
        throw new Error(error.message)
        })
        .then(res=> res.json())
        .then(user=>{dispatch(addprofiledata(user))})
        .catch((error)=>{dispatch(addprofilefailed(error.message))})
    }
}

export const addprofiledata=(data)=>({
    type:actionTypes.ADD_PROFILEDATA,
    payload:data
})

export const addprofilefailed=(err)=>({
    type:actionTypes.ADD_PROFILEDATAFAILED,
    payload:err
})

export const addprofileloading=()=>({
    type:actionTypes.ADD_PROFILEDATA_LOADING,
})

//post edited profile data

export const postprofiledata=(name,mobile,country,city,addr1,state,postalCode)=>(dispatch)=>{
    dispatch(addprofileloading(true))
    if(isuserloggedin()){
        return fetch(baseUrl+'api/useraccounts/profile',{
            method: "POST",
            body:JSON.stringify({name,mobile,country,city,addr1,state,postalCode}),
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              "authorization":localStorage.getItem('token')
            },
        })
            .then((res)=>{
                if(res.ok){
                    return res;
                }else{
                    var error=new Error('Error'+res.status+res.statusText)
                    error.res=res;
                    throw error;
                }
            },
            (error)=>{
                throw new Error(error.message)
            })
            .then(res=> res.json())
            .then(user=>{
                displaySuccess(dispatch,'Edited Successfully!!')
                dispatch(fetchprofiledata())})
            .catch((error)=>{
                displayError(dispatch,'Something went wrong:'+error.message)
            })
    }
}

//Add Website data

export const postaddurl = (url,maxResponseTime)=>(dispatch)=>{
    var newurl={
        url,maxResponseTime
    }
    return fetchFunc(baseUrl+'api/useraccounts/url',{
        method: "POST",
        body:JSON.stringify(newurl),
        headers: {
            "Content-Type": "application/json",
            "authorization":localStorage.getItem('token')
          },
        credentials: "same-origin"
    },dispatch)
    .then(Response=>{
        if(Response.success){
            // displaySuccess(dispatch,'Added case Successfully!')
            // dispatch(fetchusercases())
        }
    })
    // .catch((error)=>{
    //     displayError(dispatch,error)
    // }).finally(()=>{dispatch(clearLoading())})
}

//Load user cases

export const fetchuserurlData=()=>(dispatch)=>{
    dispatch(userurlDataloading(true));

    if(isloggedin()){
        return fetch(baseUrl+'api/useraccounts/url',{
            headers: {
                "Content-Type": "application/json",
                "authorization":localStorage.getItem('token')
              },
            credentials: "same-origin"
        })
            .then((res)=>{
                if(res.ok){
                    return res;
                }else{
                    var error=new Error('Error'+res.status+res.statusText)
                    error.res=res;
                    throw error;
                }
            },
            (error)=>{
                throw new Error(error.message)
            })
            .then(res=> res.json())
            .then(Response=>{
                if(Response.success){
                    dispatch(adduserurlData(Response.urls))
                }
            })
            .catch((error)=>{dispatch(userurlDatafailed(error.message))})
    }
}

export const userurlDataloading=()=>({
   type:actionTypes.ADD_USERURLDATA_LOADING 
})

export const userurlDatafailed=(err)=>({
    type:actionTypes.ADD_USERURLDATA_FAILED,
    payload:err
})

export const adduserurlData=(data)=>({
    type:actionTypes.ADD_USERURLDATA,
    payload:data
})

//ERROR Message

export const errorMessage=(msg)=>({
   type:actionTypes.ERROR_MESSAGE ,
   payload:msg
})

export const successMessage=(msg)=>({
    type:actionTypes.SUCCESS_MESSAGE,
    payload:msg
})

export const clearMessage=()=>({
    type:actionTypes.CLEAR_MESSAGE,
})

//LOADING
export const load=()=>({
   type:actionTypes.LOADING
})

export const clearLoading=()=>({
    type:actionTypes.CLEAR_LOADING,
})

function displaySuccess(dispatch,msg){
    dispatch(successMessage(msg))
    setTimeout(()=>{
        dispatch(clearMessage())
    },3000)
}
function displayError(dispatch,msg){
    dispatch(errorMessage(msg))
    setTimeout(()=>{
        dispatch(clearMessage())
    },3000)
}