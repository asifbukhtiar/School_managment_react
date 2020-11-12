export const CREATE_TEACHER_RES = "CREATE_TEACHER_RES";
export const CREATE_TEACHER_REQ = "CREATE_TEACHER_REQ";
export const GET_TEACHER_LIST_REQ = "GET_TEACHER_LIST_REQ";
export const TEACHER_LIST_RES = "TEACHER_LIST_RES";

export function createTeacherReq(data) {
    
    return {
        type: CREATE_TEACHER_REQ,
        payload: {
            data
        }
    }
}
export function createTeacherRes(data) {
    return {
        type: CREATE_TEACHER_RES,
        payload: {
            data
        }
    }
}

export function teacherListReq(data) {
    
    return {
        type: GET_TEACHER_LIST_REQ,
        payload: {
            data
        }
    }
}
export function teacherListRes(data) {
    return {
        type: TEACHER_LIST_RES,
        payload: {
            data
        }
    }
}