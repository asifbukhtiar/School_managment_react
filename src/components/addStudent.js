import React from "react";
import { addStudentReq } from "../actions/studentsActions";
import {connect} from "react-redux";
import { Constant } from "../constant";
import { getCookie } from "../cookies";
import UploadImage from "./upload-image";
function AddStudent(props){
    const [registration, setRegistration] = React.useState("");
    const [name, setName] = React.useState("");
    const [fatherName, setFatherName] = React.useState("");
    const [fatherCnic, setFatherCnic] = React.useState("");
    const [fatherPh, setFatherPh] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [dob, setDob] = React.useState("");
    const [bForm, setBform] = React.useState("");
    const [stdClass, setStdClass] = React.useState("");
    const [isWithdraw, setIsWithDraw] = React.useState("1");
    const [errorFor, setErrorFor] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState("");
    const [image_url, setImageUrl] = React.useState("");
    const [drop_out_date, setDropOutDate] = React.useState("");
    const [admissionDate, setAdmissionDate] = React.useState("");
    const changeView =  () => {
        props.fun("studentList")
    }
    const validation = () => {
        if(registration == ""){
            setErrorFor("registration");
            setErrorMsg("Please enter student registration#");
        }
        else if(name == ""){
            setErrorFor("name");
            setErrorMsg("Please enter student name");
        }
        else if(fatherName == ""){
            setErrorFor("fatherName");
            setErrorMsg("Please enter student father name");
        }
        else if(fatherCnic == ""){
            setErrorFor("fatherCnic");
            setErrorMsg("Please enter student father cnic");

        }
        else if(fatherPh == ""){
            setErrorFor("fatherPh");
            setErrorMsg("Please enter student father ph#");
        }
        else if(dob == ""){
            setErrorFor("dob");
            setErrorMsg("Please enter student date of birth");
        }
        else
         if(stdClass == ""){
            setErrorFor("stdClass");
            setErrorMsg("Please select student className");
        }
        else if(isWithdraw == ""){
            setErrorFor("isWithdraw");
            setErrorMsg("Please select student withdraw");
        }
        else if(address == ""){
            setErrorFor("address");
            setErrorMsg("Please enter student address");
        }
        else if(isWithdraw == "2" && drop_out_date == ""){
            setErrorFor("drop_out_date");
            setErrorMsg("Please enter drop out date");
        }
        else{
            let formDate = new FormData();
            formDate.append("registration",registration)
            formDate.append("name",name)
            formDate.append("fatherName",fatherName)
            formDate.append("fatherCnic",fatherCnic)
            formDate.append("fatherPh",fatherPh)
            formDate.append("dob",dob)
            formDate.append("bForm",bForm)
            formDate.append("className",stdClass)
            formDate.append("isWithdraw",isWithdraw == 1 ? false : true)
            formDate.append("image_url",image_url)
            formDate.append("drop_out_date",drop_out_date)
            formDate.append("address",address)
            formDate.append("admissionDate",admissionDate)
            let data = {
                "registration" : registration[0],
                "name" : name,
                "fatherName" : fatherName,
                "fatherCnic" : fatherCnic,
                "fatherPh" : fatherPh,
                "dob" : dob,
                "bForm" : bForm,
                "className" : stdClass,
                "isWithdraw" : isWithdraw == 1 ? false : true,
                "image_url" : image_url
            }
            studentCreate(formDate)
        }
    }
    const studentCreate = (data) =>{
        
        fetch(Constant.apiURl + "student/create", {
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
    const imageFile = (file) =>{
        setImageUrl(file)
    }
    const removeImageFile = () =>{
        setImageUrl("")
    }
    return(
        <div className="student-list-container">
                <div className="d-flex justify-content-end">
                        <button type="button" className="btn button-bg " onClick={changeView}>Back</button>
                </div>
                
                <div className="student-add card-container mt-4">
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="regNo">Registration #</label>
                                <input type="text" className={errorFor == "registration" ? "form-control is-invalid" : registration != "" ? "form-control is-valid" : "form-control"} id="regNo" onChange={(e) => { setRegistration(e.target.value); reset()}} aria-describedby="regNo" placeholder="Enter registration no" />
                                {errorFor == "registration" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className={errorFor == "name" ? "form-control is-invalid" : name !="" ? "form-control is-valid" : "form-control"} id="name" onChange={(e) => {setName(e.target.value);reset()}} aria-describedby="name" placeholder="Enter student name" />
                                {errorFor == "name" && errorMsg != "" ?
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
                                <label htmlFor="fatherName">Father Name</label>
                                <input type="text" className={errorFor == "fatherName" ? "form-control is-invalid" : fatherName != "" ? "form-control is-valid" : "form-control"} id="fatherName" onChange={(e) => {setFatherName(e.target.value);reset()}} aria-describedby="fatherName" placeholder="Enter student father name" />
                                {errorFor == "fatherName" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="fatherCnic">Father CNIC</label>
                                <input type="text" className={errorFor == "fatherCnic" ? "form-control is-invalid" : fatherCnic != "" ? "form-control is-valid" : "form-control"} id="fatherCnic" onChange={(e) => {setFatherCnic(e.target.value);reset()}} aria-describedby="fatherCnic" placeholder="Enter student father CNIC" />
                                {errorFor == "fatherCnic" && errorMsg != "" ?
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
                                <label htmlFor="fatherPh">Father Ph#</label>
                                <input type="text" className={errorFor == "fatherPh" ? "form-control is-invalid" : fatherPh != "" ? "form-control is-valid" : "form-control"} id="fatherPh" onChange={(e) => {setFatherPh(e.target.value);reset()}} aria-describedby="fatherPh" placeholder="Enter student father ph#" />
                                {errorFor == "fatherPh" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="dob">DOB</label>
                                <input type="date" className={errorFor == "dob" ? "form-control is-invalid" : dob != "" ? "form-control is-valid" : "form-control"} id="dob" onChange={(e) => {setDob(e.target.value);reset()}} aria-describedby="dob" placeholder="Enter student dob" />
                                {errorFor == "dob" && errorMsg != "" ?
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
                                <label htmlFor="bForm">B Form#</label>
                                <input type="text" className={errorFor == "bForm" ? "form-control is-invalid" : bForm != "" ? "form-control is-valid" : "form-control"} id="bForm" aria-describedby="bForm" onChange={(e) => {setBform(e.target.value);reset()}} placeholder="Enter student B form#" />
                                {errorFor == "bForm" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="classSelect">Select Class</label>
                                <select className={errorFor == "stdClass" ? "form-control is-invalid" : stdClass != "" ? "form-control is-valid" : "form-control"} id="classSelect" onChange={(e) => {setStdClass(e.target.value);reset()}}>
                                    <option value="">Please select</option>
                                    <option value="play(a)">Play (a)</option>
                                    <option value="play(b)">Play (b)</option>
                                    <option value="play(c)">Play (c)</option>
                                    <option value="nursery(a)">Nursery (a)</option>
                                    <option value="nursery(b)">Nursery (b)</option>
                                    <option value="nursery(c)">Nursery (c)</option>
                                    <option value="perap(a)">Perap (a)</option>
                                    <option value="perap(b)">Perap (b)</option>
                                    <option value="perap(c)">Perap (c)</option>
                                    <option value="one(a)">One (a)</option>
                                    <option value="one(b)">One (b)</option>
                                    <option value="one(c)">One (c)</option>
                                    <option value="two(a)">Two (a)</option>
                                    <option value="two(b)">Two (b)</option>
                                    <option value="three(a)">Three (a)</option>
                                    <option value="three(b)">Three (b)</option>
                                    <option value="four(a)">Four</option>
                                    <option value="five(a)">Five</option>
                                    <option value="six(a)">Six</option>
                                    <option value="seven(a)">Seven</option>
                                    <option value="eight(a)">Eight</option>
                                </select>
                                {errorFor == "stdClass" && errorMsg != "" ?
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
                                <label htmlFor="studentWithDraw">Select Withdraw</label>
                                <select className={errorFor == "isWithdraw" ? "form-control is-invalid" : isWithdraw !="" ? "form-control is-valid" : "form-control"} id="studentWithDraw"  onChange={(e) => {setIsWithDraw(e.target.value);reset()}}>
                                    <option value="">Please select</option>
                                    <option value="1">No</option>
                                    <option value="2">Yes</option>
                                    
                                </select>
                                {errorFor == "isWithdraw" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="drop_out_date">Admission Date</label>
                                <input type="date" className={errorFor == "admissionDate" ? "form-control is-invalid" : admissionDate != "" ? "form-control is-valid" : "form-control"} id="admissionDate" onChange={(e) => {setAdmissionDate(e.target.value);reset()}} aria-describedby="dob" placeholder="Enter student admission date" />
                                {errorFor == "admissionDate" && errorMsg != "" ?
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
                                <label htmlFor="drop_out_date">Drop Out Date</label>
                                <input type="date" className={errorFor == "drop_out_date" ? "form-control is-invalid" : drop_out_date != "" ? "form-control is-valid" : "form-control"} id="drop_out_date" onChange={(e) => {setDropOutDate(e.target.value);reset()}} aria-describedby="dob" placeholder="Enter student drop out date" />
                                {errorFor == "drop_out_date" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <textarea className={errorFor == "address" ? "form-control is-invalid" : address != "" ? "form-control is-valid" : "form-control"} id="address" onChange={(e) => { setAddress(e.target.value); reset()}} placeholder="Enter student address" ></textarea>
                                {errorFor == "address" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <UploadImage image_url={image_url} callBack={imageFile} removeImage={removeImageFile} />
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
                   
                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn button-bg" onClick={validation}>Add Student</button>
                    </div>
                </div>
            </div>
    )
}
const mapStateToProps = (state) => {
  
    return {
        addStudentRes : state.studentReducer,
    //   appLoader : state.appLevelReducer
    };
  };
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        addStudentReq: (data) => dispatch(addStudentReq(data)),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(AddStudent)