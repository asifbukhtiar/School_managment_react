export const ADD_STUDENT_REQ = "ADD_STUDENT_REQ";
export const ADD_STUDENT_RES = "ADD_STUDENT_RES";
export const GET_STUDENTS_REQ = "GET_STUDENTS_REQ";
export const GET_STUDENTS_RES = "GET_STUDENTS_RES";
export const UPDATE_STUDENTS_REQ = "UPDATE_STUDENTS_REQ";
export const UPDATE_STUDENTS_RES = "UPDATE_STUDENTS_RES";
export const DELTE_STUDENTS_REQ = "DELTE_STUDENTS_REQ";
export const DELETE_STUDENTS_RES = "DELETE_STUDENTS_RES";

export function addStudentReq(data) {
    
    return {
        type: ADD_STUDENT_REQ,
        payload: {
            data
        }
    }
}
export function addStudentRes(data) {
    return {
        type: ADD_STUDENT_RES,
        payload: {
            data
        }
    }
}