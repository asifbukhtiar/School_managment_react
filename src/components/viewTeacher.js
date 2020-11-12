import React from "react";
import { Constant } from "../constant";
import ReactToPrint from 'react-to-print';
function ViewTeacher(props){
    const componentRef = React.useRef([]);
    const changeView =  () => {
        props.fun("teacherList")
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
                    <div className="card-body card-container">
                        <div className="row">
                            <div className="col-2">
                                Father Name
                            </div>
                            <div className="col-2">
                            {props.data.fatherName}
                            </div>

                            <div className="col-2">
                                CNIC
                            </div>
                            <div className="col-2">
                            {props.data.cnic}
                            </div>
                            <div className="col-2">
                                Address
                            </div>
                            <div className="col-2">
                                {props.data.address}
                            </div>
                        </div>
                        <div className="row">
                            
                            <div className="col-2">
                                Ph#
                            </div>
                            <div className="col-2">
                            {props.data.phone}
                            </div>

                            <div className="col-2">
                                DOB
                            </div>
                            <div className="col-2">
                            {props.data.dob}
                            </div>
                        
                            <div className="col-2">
                            Joining Data
                            </div>
                            <div className="col-2">
                            {props.data.joiningDate}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                Qualification
                            </div>
                            <div className="col-2">
                            {props.data.qualification}
                            </div>
                            <div className="col-2">
                                Salary
                            </div>
                            <div className="col-2">
                            {props.data.salary}
                            </div>
                            <div className="col-2">
                                Teacher Withdraw
                            </div>
                            <div className="col-2">
                            {props.data.isWithDraw == true ? "YES" : "NO"}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                            Resigning date
                            </div>
                            <div className="col-2">
                            {props.data.resign_data}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewTeacher;