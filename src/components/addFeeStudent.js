import React from "react";
import {connect} from "react-redux";
import { Constant } from "../constant";
import { getCookie } from "../cookies";
import UploadImage from "./upload-image";
import ReactToPrint from 'react-to-print';
function AddFeeStudent(props){
    debugger
    const [stdName, setStdName] = React.useState(props.data.name);
    const [admissionFee, setAdmissionFee] = React.useState("");
    const [monthlyFee, setMonthlyFee] = React.useState("");
    const [totalFee, setTotalFee] = React.useState("");
    const [stdClass, setStdClass] = React.useState(props.data.class);
    const [receivedAmount, setReceivedAmount] = React.useState("");
    const [remainingFee, setRemainingFee] = React.useState("");
    const [receivedDate, setReceivedDate] = React.useState("");
    const [stdId, setStdId] = React.useState(props.data.id);
    const [errorFor, setErrorFor] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState("");
    const componentRef = React.useRef([]);
    const changeView =  () => {
        props.fun("studentList")
    }
    const validation = () => {
        if(stdName == ""){
            setErrorFor("stdName");
            setErrorMsg("Please enter student name");
        }
        else if(admissionFee == ""){
            setErrorFor("admissionFee");
            setErrorMsg("Please enter student admission fee");
        }
        else if(monthlyFee == ""){
            setErrorFor("monthlyFee");
            setErrorMsg("Please enter student monthly fee");

        }
        else if(totalFee == ""){
            setErrorFor("totalFee");
            setErrorMsg("Please enter student total fee");
        }
        else if(stdClass == ""){
            setErrorFor("stdClass");
            setErrorMsg("Please select student class");
        }
        else{
            let formDate = new FormData();
            formDate.append("stdName",stdName)
            formDate.append("admissionFee",admissionFee)
            formDate.append("monthlyFee",monthlyFee)
            formDate.append("totalFee",totalFee)
            formDate.append("stdClass",stdClass)
            formDate.append("receivedAmount",receivedAmount)
            formDate.append("remainingFee",remainingFee)
            formDate.append("receivedDate",receivedDate)
            formDate.append("stdId",stdId)
            studentFeeCreate(formDate)
        }
    }
    const studentFeeCreate = (data) =>{
        
        fetch(Constant.apiURl + "fee/create", {
            method: "POST",
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'multipart/form-data; boundary=BbC04y',
                'Authorization' : getCookie("access_token") != "" ? "Bearer" + " "  +getCookie("access_token") : ""
            },
            body: data
        }).then((response) => response.json()
        ).then( (myJson) => {
            
            
            if (myJson.success === 1) {
                setErrorFor("successResponse");
               setErrorMsg(myJson.message)    
               setTimeout(() => {
                setErrorMsg("");
                setErrorFor("");
                changeView();
            },3000)         
            } else {
            //    alert(myJson.error ? myJson.error : myJson.message)
               setErrorFor("errorResponse");
               setErrorMsg(myJson.error ? myJson.error : myJson.message)
               setTimeout(() => {
                setErrorMsg("");
                setErrorFor("");
                // changeView();
            },3000)
               
                
            }
        }).catch((error) => {
            // alert("login api error")
            setErrorFor("errorResponse");
            setErrorMsg("error in edit teacher api")
            setTimeout(() => {
                setErrorMsg("");
                setErrorFor("")
            },3000)
        });
    }
    const reset = () => {
        setErrorFor("");
        setErrorMsg("");
    }
    return(
        <div className="student-list-container">
                <div className="d-flex justify-content-end">
                        <button type="button" className="btn button-bg " onClick={changeView}>Back</button>
                </div>
                
                <div className="student-add card-container mt-4" >
                    <div ref={componentRef}>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="regNo">Student Name</label>
                                <input type="text" disabled value={stdName} className={errorFor == "stdName" ? "form-control is-invalid" : stdName != "" ? "form-control is-valid" : "form-control"} id="stdName" aria-describedby="stdName" placeholder="Enter student name" />
                                {errorFor == "stdName" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="totalFee">Total Fee</label>
                                <input type="text" value={totalFee} className={errorFor == "totalFee" ? "form-control is-invalid" : totalFee != "" ? "form-control is-valid" : "form-control"} id="totalFee" onChange={(e) => {setTotalFee(e.target.value);reset()}} aria-describedby="fatherCnic" placeholder="Enter student father CNIC" />

                                {errorFor == "totalFee" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="monthlyFee">Monthly Fee</label>
                                <input type="text" value={monthlyFee} className={errorFor == "monthlyFee" ? "form-control is-invalid" : monthlyFee != "" ? "form-control is-valid" : "form-control"} id="monthlyFee" onChange={(e) => {setMonthlyFee(e.target.value);reset()}} aria-describedby="monthlyFee" placeholder="Enter student monthly fee" />
                                {errorFor == "monthlyFee" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                        <div className="col-6">
                        <div className="form-group">
                                <label htmlFor="name">Admission Fee</label>
                                <input type="text" value={admissionFee} className={errorFor == "admissionFee" ? "form-control is-invalid" : admissionFee !="" ? "form-control is-valid" : "form-control"} id="admissionFee" onChange={(e) => {setAdmissionFee(e.target.value);reset()}} aria-describedby="name" placeholder="Enter student admission fee" />
                                {errorFor == "admissionFee" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                            
                        </div>
                    </div>
                    
                    <div className="row">
                        
                        <div className="col-6">
                        <div className="form-group">
                                <label htmlFor="stdClass">Student Class</label>
                                <input type="text"  value={stdClass} className={errorFor == "stdClass" ? "form-control is-invalid" : stdClass != "" ? "form-control is-valid" : "form-control"} id="stdClass" onChange={(e) => setStdClass(e.target.value)} aria-describedby="stdClass" placeholder="Enter student class" />
                                {errorFor == "stdClass" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="receivedAmount">Received Amount</label>
                                <input type="text" className={errorFor == "receivedAmount" ? "form-control is-invalid" : receivedAmount != "" ? "form-control is-valid" : "form-control"} id="receivedAmount" onChange={(e) => {setReceivedAmount(e.target.value);reset()}} aria-describedby="dob" placeholder="Enter received amount" />
                                {errorFor == "receivedAmount" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="remainingFee">Remaining Fee</label>
                                <input type="text" className={errorFor == "remainingFee" ? "form-control is-invalid" : remainingFee != "" ? "form-control is-valid" : "form-control"} id="remainingFee" aria-describedby="remainingFee" onChange={(e) => {setRemainingFee(e.target.value);reset()}} placeholder="Enter student remaining fee" />
                                {errorFor == "remainingFee" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                        <div className="col-6">
                        <div className="form-group">
                                <label htmlFor="receivedDate">Received Fee Date</label>
                                <input type="date" className={errorFor == "receivedDate" ? "form-control is-invalid" : receivedDate != "" ? "form-control is-valid" : "form-control"} id="receivedDate" aria-describedby="receivedDate" onChange={(e) => {setReceivedDate(e.target.value);reset()}} placeholder="Enter student received fee date" />
                                {errorFor == "receivedDate" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {errorMsg !="" && errorFor == "errorResponse" ? 
                                <div className="alert alert-danger">
                                    {errorMsg}
                                </div>
                            :""}
                            {errorMsg !="" && errorFor == "successResponse" ? 
                                <div className="alert alert-success">
                                    {errorMsg}
                                </div>
                            :""}
                        </div>
                    </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn button-bg" onClick={validation}>Save</button>
                        <ReactToPrint
                                trigger={() => <button className="btn button-bg ">Print</button>}
                                content={() => componentRef.current}
                        />

                    </div>
                </div>
            </div>
    )
}
const mapStateToProps = (state) => {
  
    return {
        // addStudentRes : state.studentReducer,
    //   appLoader : state.appLevelReducer
    };
  };
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        // addStudentReq: (data) => dispatch(addStudentReq(data)),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(AddFeeStudent)