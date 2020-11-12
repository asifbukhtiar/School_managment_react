import {takeEvery, call, put} from 'redux-saga/effects';
import * as userActions from "../actions/userAction";
import ApiCall from "../services/userService";

function* loginReq(data){
   
    try{
        let loginData = {
            email : data.payload.data.email,
            password : data.payload.data.password,
        }
        let res = yield call(getApiResponse,"POST","user/login",loginData)
        
        yield put(userActions.loginRes(res)); 
    }catch(e){
        
        yield put(userActions.loginRes(e)); 
        console.log(e)

    }
   
}


const getApiResponse = async (method,endPoint,data)=>{
    return await ApiCall(method,endPoint,data);
  }
export function* userWathcer(){
    
    yield takeEvery(userActions.USER_LOGIN_REQ, loginReq);
}