import React from "react";
import { Constant } from "../constant";
import ReactToPrint from 'react-to-print';
function ViewStudent(props){
    const componentRef = React.useRef([]);
    const changeView =  () => {
        props.fun("studentList")
    }
    return(
        <div className="student-view-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
            <ReactToPrint
                                trigger={() => <button className="btn button-bg ">Print</button>}
                                content={() => componentRef.current}
                />
                 <button type="button" className="btn button-bg " onClick={changeView}>Back</button>
            </div>
            <div ref={componentRef}>
                <div className="image-container">
                    <img src={props.data.image_url == "" ? require("../images/avatar.png") : Constant.apiURl + props.data.image_url} style={{"width" : "200px", borderRadius: "10%"}} />
                    <h4 className="text-uppercase text-center">{props.data.name}</h4>
                </div>
                
                <div className="card mt-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-2">
                                Registration#
                            </div>
                            <div className="col-2">
                            {props.data.registration}
                            </div>
                            <div className="col-2">
                                Father Name
                            </div>
                            <div className="col-2">
                            {props.data.fatherName}
                            </div>
                            <div className="col-2">
                                Father CNIC
                            </div>
                            <div className="col-2">
                                {props.data.fatherCnic}
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="col-2">
                                Father Ph#
                            </div>
                            <div className="col-2">
                                {props.data.fatherMobile}
                            </div>
                            <div className="col-2">
                                Class
                            </div>
                            <div className="col-2">
                            {props.data.class}
                            </div>
                            <div className="col-2">
                                DOB
                            </div>
                            <div className="col-2">
                                {props.data.dob}
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="col-2">
                                B form#
                            </div>
                            <div className="col-2">
                                {props.data.bForm}
                            </div>
                            <div className="col-2">
                                student Withdraw
                            </div>
                            <div className="col-2">
                                {props.data.isWithdraw == "false" ? "NO" : "YES"}
                            </div>
                            <div className="col-2">
                                Admission Date
                            </div>
                            <div className="col-2">
                                {props.data.admissionDate}
                            </div>
                        </div>
                        <div className="row">
                        <div className="col-2">
                                Drop Out Date
                            </div>
                            <div className="col-2">
                                {props.data.drop_out_date}
                            </div>
                            <div className="col-2">
                                Address
                            </div>
                            <div className="col-6">
                                {props.data.address}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewStudent;