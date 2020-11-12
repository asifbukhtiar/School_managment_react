import {takeEvery, call, put} from 'redux-saga/effects';
import * as studentActions from "../actions/studentsActions";
import ApiCall from "../services/studentService";

function* addStudentReq(data){
   
    try{
    
        let res = yield call(getStudenApiResponse,"POST","student/create",data, "")
        
        yield put(studentActions.addStudentRes(res)); 
    }catch(e){
        
        yield put(studentActions.addStudentRes(e)); 
        console.log(e)

    }
   
}
function* studentList(){
   
    try{
    
        let res = yield call(getStudenApiResponse,"GET","students", "")
        
        yield put(studentActions.addStudentRes(res)); 
    }catch(e){
        
        yield put(studentActions.addStudentRes(e)); 
        console.log(e)

    }
   
}


const getStudenApiResponse = async (method,endPoint,data,token)=>{
    return await ApiCall(method,endPoint,data,token);
  }
export function* studentsWathcer(){
    
    yield takeEvery(studentActions.ADD_STUDENT_REQ, addStudentReq);
    yield takeEvery(studentActions.GET_STUDENTS_REQ, studentList);
}