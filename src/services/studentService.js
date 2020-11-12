import {Constant} from "../constant";
export default function ApiCall(method,endPoint,data,token){
    
    
    return new Promise((reslove, reject) => {
    fetch(Constant.apiURl + endPoint, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : token != "" ? "Bearer" + " "  +token : ""
        },
        body: JSON.stringify(data)
    }).then((response) => response.json()
    ).then( (myJson) => {
        console.log("login service res", myJson)
        
        if (myJson.success === 1) {
            let res ={
                success : 1,
                data : myJson.data,
                message : ""
            }
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