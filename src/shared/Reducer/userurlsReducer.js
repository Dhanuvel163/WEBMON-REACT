import * as  actionTypes from '../actionTypes';

export const userurls=(state={userurls:[],isloading:true,err:null},action)=>{
    switch(action.type){
        case actionTypes.ADD_USERURLDATA:
            return {...state,userurls:action.payload,isloading:false,err:null}
        case actionTypes.ADD_USERURLDATA_FAILED:
            return {...state,userurls:[],isloading:false,err:action.payload}
        case actionTypes.ADD_USERURLDATA_LOADING:
            return {...state,userurls:[],isloading:true,err:null}
        default:
            return state;
    }
}