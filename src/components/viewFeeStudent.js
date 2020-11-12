import React from "react";
import { Constant } from "../constant";
import moment from 'moment';
import { getCookie } from "../cookies";
import ReactToPrint from 'react-to-print';
function ViewStudentFee(props){
    const[fees,setFees] = React.useState("");
    const componentRef = React.useRef([]);
    const getStudentFeeList = () =>{
        fetch(Constant.apiURl + "fee?stdId=" + props.data.id, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : getCookie("access_token") != "" ? "Bearer" + " "  +getCookie("access_token") : ""
            },
        }).then((response) => response.json()
        ).then( (myJson) => {
            if (myJson.success === 1) {
                setFees(myJson.data) 
                                            
            } else {
               alert(myJson.error ? myJson.error : myJson.message)
               
                
            }
        }).catch((error) => {
            // alert("login api error")
            alert("error in API")
            
    
               
        });
    }
    React.useEffect(() => {
        if(fees == ""){
            getStudentFeeList()
        }
      },[fees]);
    const changeView =  () => {
        props.fun("studentList")
    }
    const getCurrentDiv = (el) => {
        debugger
    }
    return(
        <div className="student-view-container">
            <div className="d-flex justify-content-end">
                 <button type="button" className="btn button-bg " onClick={changeView}>Back</button>
            </div>
            <div className="image-container">
                <img src={props.data.image_url == "" ? require("../images/avatar.png") : Constant.apiURl + props.data.image_url} style={{"width" : "200px", borderRadius: "10%"}} />
                <h4 className="text-uppercase text-center">{props.data.name}</h4>
            </div>
            <div className="row">
            {fees && fees.length > 0 ? 
                fees.map( (d,idx) => {
                    // const componentRef = React.useRef()
                    return <div key={idx} id={d.id} className="card card-container mt-4 col-12 col-sm-4 pt-0 mr-3">
                    <div  ref={el => componentRef.current[idx] = el}  className="card-body p-0 fee-list">
                        
                        <h4 className="text-center">{moment(d.receivedDate).format("LL")}</h4>
                        
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text">
                                Father Name
                            </div>
                            <div className="value">
                                {props.data.fatherName}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text">
                                Student Class
                            </div>
                            <div className="value">
                                {d.stdClass}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text">
                                Total Fee
                            </div>
                            <div className="value">
                                {d.totalFee}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text">
                                Admission Fee
                            </div>
                            <div className="value">
                                {d.admissionFee}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text">
                                Monthly Fee
                            </div>
                            <div className="value">
                                {d.monthlyFee}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text">
                                Received Fee
                            </div>
                            <div className="value">
                                {d.receivedAmount}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text">
                                Received Fee Date
                            </div>
                            <div className="value">
                                {moment(d.receivedDate).format("LL")}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text">
                                Remaining Fee 
                            </div>
                            <div className="value">
                                {d.remainingFee}
                            </div>
                        </div>
                        
                    </div>
                    <ReactToPrint
                                trigger={() => <button className="btn button-bg ">Print</button>}
                                content={() => componentRef.current[idx]}
                        />
                </div>
                } )
                
            :"No Record found"}
            </div>
        </div>
    )
}
export default ViewStudentFee;