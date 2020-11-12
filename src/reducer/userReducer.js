import INITIAL_STATE from "../initialState/initialStats";
import * as Action from "../actions/userAction";
export  function userReducer (state = INITIAL_STATE, action){
    
    switch (action.type) {
       
      case Action.USER_LOGIN_RES:
        
        let userState = {...state}
        userState.user = action.payload.data;
        state = userState;
          return userState.user;
    default:
      return state
    }
};