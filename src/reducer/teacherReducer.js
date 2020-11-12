import INITIAL_STATE from "../initialState/initialStats";
import * as Action from "../actions/teacherAction";
export  function teacherReducer (state = INITIAL_STATE, action){
    
    switch (action.type) {
       
    case Action.CREATE_TEACHER_RES:
        
        let teacherState = {...state}
        teacherState.teacher = action.payload.data;
        state = teacherState;
        return teacherState.teachers;
    case Action.TEACHER_LIST_RES:
        
        let teacherListState = {...state}
        teacherListState.teacher = action.payload.data;
        state = teacherListState;
        return teacherListState.teachers;
    default:
      return state
    }
};