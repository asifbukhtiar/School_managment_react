import { combineReducers } from 'redux';
import {studentReducer}  from"./studentReducer";
import {userReducer}  from"./userReducer";
import {teacherReducer}  from"./teacherReducer";
const rootReducer = combineReducers({
    studentReducer,
    userReducer,
    teacherReducer
  });
  export default rootReducer;