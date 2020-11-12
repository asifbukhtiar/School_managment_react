import React from "react";
import SearchComponent from "./searchComponent";
import { getCookie } from "../cookies";
import { Constant } from "../constant";
import StudentSearchComponent from "./studentSearchComponent";
import ReactToPrint from 'react-to-print';
function StudentList(props){
    const [students,setStudents] = React.useState("")
    const [rawStudents,setRawStudents] = React.useState("")
    const [isWithdrawFilter,setWithdrawFilter] = React.useState(false);
    const componentRef = React.useRef([]);
    const changeView = (view,d) => {
        props.fun(view,d)
    }
    const getStudentList = (value) =>{
        fetch(Constant.apiURl + "student?isServed=" + value, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : getCookie("access_token") != "" ? "Bearer" + " "  +getCookie("access_token") : ""
            },
        }).then((response) => response.json()
        ).then( (myJson) => {
            console.log("login service res", myJson)
            if (myJson.success === 1) {
                setStudents(myJson.data)                
                setRawStudents(myJson.data)                
            } else {
               alert(myJson.error ? myJson.error : myJson.message)
               
                
            }
        }).catch((error) => {
            // alert("login api error")
            alert("error in API")
            
    
               
        });
    }
    const searchFilter = (value , className) => {
        
        if(value == "" && className == ""){
            setStudents(rawStudents)
        }else if(rawStudents && rawStudents.length > 0){
            if(value !== "" && className !== ""){
                let searchedStudents = rawStudents.filter(item => {
                if((item.name.toLowerCase().includes(value.toLowerCase()) || item.fatherName.toLowerCase().includes(value.toLowerCase())) && item.class === className)
                {
                    return item
                }
              });
              setStudents(searchedStudents && searchedStudents.length == 0 ? null : searchedStudents)
            }
            else if(value !== "" && className == ""){
                let searchedStudents = rawStudents.filter(item => {
                    if((item.name.toLowerCase().includes(value.toLowerCase()) || item.fatherName.toLowerCase().includes(value.toLowerCase())))
                    {
                        return item
                    }
                  });
                  setStudents(searchedStudents && searchedStudents.length == 0 ? null : searchedStudents)
            }
            else if(value == "" && className !=""){
                let searchedStudents = rawStudents.filter(item => {
                    if(item.class == className)
                    {
                        return item
                    }
                  });
                  setStudents(searchedStudents && searchedStudents.length == 0 ? null : searchedStudents)

            }
            
        }
        
         
    }
    const changeCheckboxValue = (value) => {
        
        setWithdrawFilter(value);
        setStudents("")
    }
    React.useEffect(() => {
        if(students == ""){
            getStudentList(isWithdrawFilter)
        }
      },[students]);
    return(
        <div className="student-list-container">
                <div className="row d-flex justify-content-end">
                     <button type="button" className="btn button-bg " onClick={() => changeView("addStudent")}>Add Student</button>
                </div>
                <StudentSearchComponent callback={searchFilter} />
                <div className="student-list mt-4">
                <div class="col-auto mb-4 d-flex align-items-center justify-content-between">
                <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" id="autoSizingCheck" onChange={(e) => changeCheckboxValue(e.target.checked)} />
                    <label class="form-check-label" for="autoSizingCheck">
                    Is Withdraw
                    </label>
                </div>
                <ReactToPrint
                                trigger={() => <button className="btn button-bg ">Print</button>}
                                content={() => componentRef.current}
                />
                </div>
                {students && students.length > 0 ?
                    <table ref={componentRef} className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Registration#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Father Name</th>
                                <th scope="col">Class</th>
                                <th scope="col">Withdraw</th>
                                <th scope="col">Fee</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        students && students.length > 0 ?
                        students.map((d,i) => {
                            return (<tr key={i}>
                                <td><img src={d.image_url == "" ? require("../images/avatar.png") : Constant.apiURl + d.image_url} style={{"height" : "49px", "width":"50px", borderRadius: "50%"}} /></td>
                                <td >{d.registration}</td>
                                <td>{d.name}</td>
                                <td>{d.fatherName}</td>
                                <td>{d.class}</td>
                                <td>{d.isWithdraw == "false" ? "NO" : "True"}</td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-secondary" onClick={() => changeView("addStudentFee", d)}>Add Fee</button>
                                        
                                        <button type="button" className="btn btn-secondary" onClick={() => changeView("viewStudentFee", d)}>View Fees</button>
                                        
                                        </div>
                                </td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-secondary" onClick={() => changeView("viewStudent", d)}>View</button>
                                        <button type="button" className="btn btn-secondary" onClick={() => changeView("editStudent", d)}>Edit</button>
                                    </div>
                                </td>
                                
                            </tr>
                            )
                        })
                        : ""
                        }
                            
                        </tbody>
                    </table>
                :
                <h5>Students not found</h5>
                }
                </div>
            </div>
    )
}
export default StudentList;