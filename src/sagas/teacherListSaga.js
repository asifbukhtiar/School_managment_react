import {takeEvery, call, put} from 'redux-saga/effects';
import * as teacherActions from "../actions/teacherAction";
import ApiCall from "../services/userService";

function* teacherList(data){
   
    try{
        let loginData = {
            email : data.payload.data.email,
            password : data.payload.data.password,
        }
        let res = yield call(getApiResponse,"POST","user/login",loginData)
        
        // yield put(teacherActions.teacherListRes(res)); 
    }catch(e){
        
        // yield put(teacherActions.teacherListRes(e)); 
        console.log(e)

    }
   
}


const getApiResponse = async (method,endPoint,data)=>{
    return await ApiCall(method,endPoint,data);
  }
export function* teacherListWatcher(){
    
    yield takeEvery(teacherActions.GET_TEACHER_LIST_REQ, teacherList);
}