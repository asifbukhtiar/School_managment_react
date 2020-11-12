import {Constant} from "../constant";
import { setCookie, getCookie } from "../cookies";
export default function ApiCall(method,endPoint,data){
    return new Promise((reslove, reject) => {
    fetch(Constant.apiURl + endPoint, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : "Bearer " + getCookie("access_token")
        },
        body: JSON.stringify(data)
    }).then((response) => response.json()
    ).then( (myJson) => {
        console.log("login service res", myJson)
        
        if (myJson.isSuccess === true) {
            let res ={
                success : 1,
                data : myJson.data,
                message : myJson.message
            }
            setCookie("access_token", myJson.data.access_token, 30);
            reslove( res)
            
        } else {
            let res ={
                success : 0,
                data : "",
                message  :myJson.error ? myJson.error : myJson.message 
            }
            reslove( res)
            
        }
    }).catch((error) => {
        // alert("login api error")
        let res ={
            success : 0,
            data : "",
            message : "error in api"
        }
        reject(res)

           
    });
    })
}