import React from "react";
import { loginReq } from "../actions/userAction";
import {connect} from "react-redux";
import { getCookie } from "../cookies";
import { Constant } from "../constant";
function ChangePassword (props) {
    const [password,setPassword] = React.useState("")
    const [confirmPassword,setConfirmPassword] = React.useState("")
    const [errorMsg,setErrorMsg] = React.useState("");
    const [errorType,setErrorType] = React.useState("");

    const gotoDashboard = () =>{
        props.fun("studentList")
    }
    const rersetState = () => {
        setErrorMsg("")
        setErrorType("")
    }
    const validation = () => {
        console.log("confirmPassword",confirmPassword);
        console.log("password",password);
        if(password == ""){
            setErrorMsg("Please enter password")
            setErrorType("danger")
        }else if(confirmPassword == ""){
            setErrorMsg("Please enter confirm password")
            setErrorType("danger")
        }
        else if(confirmPassword !== password ){
            setErrorMsg("Confirm password is not match with password")
            setErrorType("danger")
        }else{
            let formDate = new FormData();
            formDate.append("password",password)
            formDate.append("confirmPassword",confirmPassword)
            passwordChange(formDate)
        }
    }
    const passwordChange = (data) =>{
        
        fetch(Constant.apiURl + "user/change-password", {
            method: "POST",
            headers: {
                'Authorization' : getCookie("access_token") != "" ? "Bearer" + " "  +getCookie("access_token") : ""
            },
            body: data
        }).then((response) => response.json()
        ).then( (myJson) => {
            if (myJson.isSuccess == true) {
                setErrorType("success");
               setErrorMsg(myJson.message)    
               setTimeout(() => {
                setErrorMsg("");
                setErrorType("");
                gotoDashboard();
            },3000)         
            } else {
            //    alert(myJson.error ? myJson.error : myJson.message)
               setErrorType("danger");
               setErrorMsg(myJson.error ? myJson.error : myJson.message)
               setTimeout(() => {
                setErrorMsg("");
                setErrorType("");
                // changeView();
            },3000)
               
                
            }
        }).catch((error) => {
            // alert("login api error")
            setErrorType("danger");
            setErrorMsg("error in change password api")
            setTimeout(() => {
                setErrorMsg("");
                setErrorType("")
            },3000)
        });
    }
        return(
            <div className="">
                <div className="col-4 container shadow  rounded p-4 card">
                    <div className="login-container">
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">New Password</label>
                                <input type="password" className="form-control" onChange={(e) => {setPassword( e.target.value); rersetState()}} id="exampleInputPassword1" placeholder="New Password" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Confirm Password</label>
                                <input type="password" className="form-control" onChange={(e) => {setConfirmPassword(e.target.value); rersetState()}} id="exampleInputPassword1" placeholder="Confirm Password" />
                            </div>
                            {errorMsg != "" ? 
                                <div className={`alert alert-${errorType}`} role="alert">
                                    {errorMsg}
                                </div>
                            :""}
                            <button type="button" className="btn button-bg " onClick={validation}>Change Password</button>
                    </div>
                </div>
            </div>
        )
    
}
export default ChangePassword;