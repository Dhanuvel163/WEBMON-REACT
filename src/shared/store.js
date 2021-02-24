import {createStore,combineReducers,applyMiddleware} from 'redux';

import {users} from './Reducer/userReducer';
import {profiledata} from './Reducer/profiledataReducer';
import {userurls} from './Reducer/userurlsReducer';
import {errors} from './Reducer/errorReducer';
import {loading} from './Reducer/loadingReducer';

import thunk from 'redux-thunk';

export const configStore=()=>{
    const store=createStore(
        combineReducers({
            users:users,
            profiledata:profiledata,
            userurls,
            errors,
            loading
        }),
        applyMiddleware(thunk)
    );
    return store;
}