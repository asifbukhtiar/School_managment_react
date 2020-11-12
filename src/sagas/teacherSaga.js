import {takeEvery, call, put, all, takeLatest} from 'redux-saga/effects';
import * as teacherActions from "../actions/teacherAction";
import ApiCall from "../services/userService";

function* createTeacher(data){
   
    try{
        let res = yield call(getApiResponse,"POST","teacher/create",data.payload.data)
        yield put(teacherActions.createTeacherRes(res)); 
    }catch(e){
        
        yield put(teacherActions.createTeacherRes(e)); 
        console.log(e)

    }
   
}
function* getTeacherList(){
    
    try{
        let res = yield call(getApiResponse,"POST","teacher/create","")
        yield put(teacherActions.createTeacherRes(res)); 
    }catch(e){
        
        yield put(teacherActions.createTeacherRes(e)); 
        console.log(e)

    }
    
 }

 
const getApiResponse = async (method,endPoint,data)=>{
    return await ApiCall(method,endPoint,data);
  }

 
export function* teacherWathcer(){
    // yield takeLatest(teacherActions.TEACHER_LIST_REQ, getTeacherList);
    yield takeLatest(teacherActions.CREATE_TEACHER_REQ, createTeacher);
}