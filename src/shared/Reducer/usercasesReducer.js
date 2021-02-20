import * as  actionTypes from '../actionTypes';

export const usercases=(state={usercasedata:[],isloading:true,err:null},action)=>{
    switch(action.type){
        case actionTypes.ADD_USERURLDATA:
            return {...state,usercasedata:action.payload,isloading:false,err:null}
        case actionTypes.ADD_USERURLDATA_FAILED:
            return {...state,usercasedata:[],isloading:false,err:action.payload}
        case actionTypes.ADD_USERURLDATA_LOADING:
            return {...state,usercasedata:[],isloading:true,err:null}
        default:
            return state;
    }
}