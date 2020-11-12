import INITIAL_STATE from "../initialState/initialStats";
import * as Action from "../actions/studentsActions";
export  function studentReducer (state = INITIAL_STATE, action){
    
    switch (action.type) {
       
      case Action.ADD_STUDENT_RES:
        
        let studentState = {...state}
        studentState.AddStudentRes = action.payload.data;
        state = studentState;
          return studentState;
    default:
      return state
    }
};