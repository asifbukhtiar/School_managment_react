export const USER_LOGIN_REQ = "USER_LOGIN_REQ";
export const USER_LOGIN_RES = "USER_LOGIN_RES";

export function loginReq(data) {
    
    return {
        type: USER_LOGIN_REQ,
        payload: {
            data
        }
    }
}
export function loginRes(data) {
    return {
        type: USER_LOGIN_RES,
        payload: {
            data
        }
    }
}