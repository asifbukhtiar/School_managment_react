import {all} from 'redux-saga/effects';
import { studentsWathcer } from './studentSaga';
import { userWathcer } from './userSaga';
import { teacherWathcer } from './teacherSaga';
import { teacherListWatcher } from './teacherListSaga';


export default function* rootSaga(){
    yield all([
        studentsWathcer(),
        userWathcer(),
        teacherWathcer(),
        teacherListWatcher(),
    ]);
}