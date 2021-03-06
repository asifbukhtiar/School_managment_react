import React from "react";
import { connect } from "react-redux"
import { createTeacherReq } from "../actions/teacherAction";
import { Constant } from "../constant";
import { getCookie } from "../cookies";
import UploadImage from "./upload-image";
function EditTeacher(props){
    debugger
    const [name, setName] = React.useState(props.data.name);
    const [fatherName, setFatherName] = React.useState(props.data.fatherName);
    const [cnic, setCnic] = React.useState(props.data.cnic);
    const [ph, setPh] = React.useState(props.data.phone);
    const [dob, setDob] = React.useState(props.data.dob);
    const [joiningDate, setJoiningDate] = React.useState(props.data.joiningDate);
    const [address, setAddress] = React.useState(props.data.address);
    const [qualification, setQualification] = React.useState(props.data.qualification);
    const [salary, setSalary] = React.useState(props.data.salary);
    const [errorFor, setErrorFor] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState("");
    const [isWithdraw, setIsWithDraw] = React.useState(props.data.isWithDraw == true ? "2" : "1");
    const [image_url, setImageUrl] = React.useState(props.data.image_url);
    const [resign_data, setResignDate] = React.useState(props.data.resign_data);

    const reset = () => {
        setErrorFor("")
        setErrorMsg("")
    }
    const changeView =  () => {
        props.fun("teacherList")
    }
    const validation = () => {
        if(name == ""){
            setErrorFor("name");
            setErrorMsg("Please enter name");
        }
        else if(fatherName == ""){
            setErrorFor("fatherName");
            setErrorMsg("Please enter teacher father name");
        }
        else if(cnic == ""){
            setErrorFor("cnic");
            setErrorMsg("Please enter cnic");

        }
        else if(ph == ""){
            setErrorFor("ph");
            setErrorMsg("Please enter ph#");
        }
        else if(dob == ""){
            setErrorFor("dob");
            setErrorMsg("Please enter  date of birth");
        }
        else if(joiningDate == ""){
            setErrorFor("joiningDate");
            setErrorMsg("Please enter joining date");
        }
        else
         if(address == ""){
            setErrorFor("address");
            setErrorMsg("Please enter address");
        }
        else if(qualification == ""){
            setErrorFor("qualification");
            setErrorMsg("Please enter qualification");
        }
        else if(salary == ""){
            setErrorFor("salary");
            setErrorMsg("Please enter salary");
        }
        else if(isWithdraw == "2" && resign_data){
            setErrorFor("resign_data");
            setErrorMsg("Please enter resignation date");
        }
        else{
            let data = {
                "name" : name,
                "fatherName" : fatherName,
                "cnic" : cnic,
                "phone" : ph,
                "dob" : dob,
                "joiningDate" : joiningDate,
                "address" : address,
                "qualification" : qualification,
                "salary" : salary,
                "isWithdraw" : isWithdraw == 1 ? true : false
            }
            let formData = new FormData()
            formData.append("name",name)
            formData.append("fatherName",fatherName)
            formData.append("cnic",cnic)
            formData.append("phone",ph)
            formData.append("dob",dob)
            formData.append("joiningDate",joiningDate)
            formData.append("address",address)
            formData.append("qualification",qualification)
            formData.append("salary",salary)
            formData.append("isWithdraw",isWithdraw == 1 ? false : true)
            formData.append("image_url",image_url)
            formData.append("resign_data",resign_data)
            teacherUpdate(formData)
        }
    }
    const teacherUpdate = (value) =>{
        
        fetch(Constant.apiURl + "teacher/" + props.data.id, {
            method: "PUT",
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                'Authorization' : getCookie("access_token") != "" ? "Bearer" + " "  +getCookie("access_token") : ""
            },
            body: value
        }).then((response) => response.json()
        ).then( (myJson) => {
            
            setTimeout(() => {
                setErrorMsg("");
                setErrorFor("");
                changeView();
            },3000)
            if (myJson.success === 1) {
                setErrorFor("successResponse");
               setErrorMsg(myJson.message)             
            } else {
            //    alert(myJson.error ? myJson.error : myJson.message)
               setErrorFor("errorResponse");
               setErrorMsg(myJson.error ? myJson.error : myJson.message)
               
                
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
    const imageFile = (file) =>{
        debugger
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
                                <label htmlFor="name">Name</label>
                                <input type="text" className={errorFor == "name" ? "form-control is-invalid" : name != "" ? "form-control is-valid" : "form-control"} id="name" value={name} onChange={(e) => { setName(e.target.value); reset()}} aria-describedby="name" placeholder="Enter teacher name" />
                                {errorFor == "name" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="fatherName">Father Name</label>
                                <input type="text" className="form-control" value={fatherName} className={errorFor == "fatherName" ? "form-control is-invalid" : fatherName != "" ? "form-control is-valid" : "form-control"} onChange={(e) => { setFatherName(e.target.value); reset()}} id="fatherName" aria-describedby="fatherName" placeholder="Enter teacher father name" />
                                {errorFor == "fatherName" && errorMsg != "" ?
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
                                <label htmlFor="fatherCnic">CNIC</label>
                                <input type="text"  id="fatherCnic" value={cnic} className={errorFor == "cnic" ? "form-control is-invalid" : cnic != "" ? "form-control is-valid" : "form-control"} aria-describedby="fatherCnic" onChange={(e) => { setCnic(e.target.value); reset()}} placeholder="Enter teacher CNIC" />
                                {errorFor == "cnic" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="fatherPh">Ph#</label>
                                <input type="text" value={ph} className={errorFor == "ph" ? "form-control is-invalid" : ph != "" ? "form-control is-valid" : "form-control"} id="fatherPh" onChange={(e) => { setPh(e.target.value); reset()}} aria-describedby="fatherPh" placeholder="Enter teacher ph#" />
                                {errorFor == "ph" && errorMsg != "" ?
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
                                <label htmlFor="dob">DOB</label>
                                <input type="date" value={dob} className={errorFor == "dob" ? "form-control is-invalid" : dob != "" ? "form-control is-valid" : "form-control"} id="dob" onChange={(e) => { setDob(e.target.value); reset()}} aria-describedby="dob" placeholder="Enter teacher dob" />
                                {errorFor == "dob" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="teacherJoiningDate">Teacher Joining Date</label>
                                <input type="date" value={joiningDate} className={errorFor == "joiningDate" ? "form-control is-invalid" : joiningDate != "" ? "form-control is-valid" : "form-control"} onChange={(e) => { setJoiningDate(e.target.value); reset()}} id="teacherJoiningDate" aria-describedby="teacherJoiningDate" placeholder="Enter teacher joining data" />
                                {errorFor == "joiningDate" && errorMsg != "" ?
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
                                <label htmlFor="teacherJoiningDate">Teacher Resigning  Date</label>
                                <input type="date" value={resign_data} className={errorFor == "resign_data" ? "form-control is-invalid" : resign_data != "" ? "form-control is-valid" : "form-control"} onChange={(e) => { setResignDate(e.target.value); reset()}} id="teacherResign_data" aria-describedby="teacherResign_data" placeholder="Enter teacher Resigning  data" />
                                {errorFor == "resign_data" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                        
                        <div className="col-6">
                        <div className="form-group">
                                <label htmlFor="studentWithDraw">Select Withdraw {isWithdraw}</label>
                                <select value={isWithdraw} className={errorFor == "isWithdraw" ? "form-control is-invalid" : isWithdraw !="" ? "form-control is-valid" : "form-control"} id="studentWithDraw"  onChange={(e) => {setIsWithDraw(e.target.value);reset()}}>
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
                        
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="teacherQualification">Teacher Qualification</label>
                                <input type="text" value={qualification} className={errorFor == "qualification" ? "form-control is-invalid" : qualification != "" ? "form-control is-valid" : "form-control"} id="teacherQualification" onChange={(e) => { setQualification(e.target.value); reset()}} aria-describedby="teacherQualification" placeholder="Enter teacher qualification" />
                                {errorFor == "qualification" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="teacherSalary">Teacher Salary</label>
                                <input type="text" value={salary} className={errorFor == "salary" ? "form-control is-invalid" : salary != "" ? "form-control is-valid" : "form-control"} id="teacherSalary" aria-describedby="teacherSalary" onChange={(e) => { setSalary(e.target.value); reset()}} placeholder="Enter teacher salary" />
                                {errorFor == "salary" && errorMsg != "" ?
                                <div className="invalid-feedback">
                                    {errorMsg}
                                </div>
                                :""}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <textarea value={address} className={errorFor == "address" ? "form-control is-invalid" : address != "" ? "form-control is-valid" : "form-control"} id="address" onChange={(e) => { setAddress(e.target.value); reset()}} placeholder="Enter teacher address" ></textarea>
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
                        <button type="button" className="btn button-bg " onClick={validation}>Edit Teacher</button>
                    </div>
                </div>
            </div>
    )
}
const mapStateToProps = (state) => {
  
    return {
        // addTeacherRes : state.teacherReducer,
    //   appLoader : state.appLevelReducer
    };
  };
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        // createTeacherReq: (data) => dispatch(createTeacherReq(data)),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(EditTeacher)