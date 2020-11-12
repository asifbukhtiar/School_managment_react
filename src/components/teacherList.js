import React from "react";
import { teacherListReq } from "../actions/teacherAction";
import SearchComponent from "./searchComponent";
import { connect } from "react-redux"
import { Constant } from "../constant";
import { getCookie } from "../cookies";
import ReactToPrint from 'react-to-print';
function TeacherList(props){
    const [teachers,setTeachers] = React.useState("")
    const [rawTeachers,setrawTeachers] = React.useState("")
    const [isWithdrawFilter,setWithdrawFilter] = React.useState(false);
    const [searchText,setSeachText] = React.useState("");
    const componentRef = React.useRef([]);
    const changeView = (view,data) => {
        props.fun(view,data)
    }
    const searchFilter = (value) => {
        if(value == ""){
            setTeachers(rawTeachers)
        }else{
            let searchedTeacher = teachers.filter(item => {
                if(item.name.toLowerCase().includes(value.toLowerCase()) || item.fatherName.toLowerCase().includes(value.toLowerCase()))
                {
                    return item
                }
              });
              setTeachers(searchedTeacher)
        }
        
         
    }
    const getTeacherList = (value) =>{
        fetch(Constant.apiURl + "teacher?isServed=" + value, {
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
                setTeachers(myJson.data)                
                setrawTeachers(myJson.data)                
            } else {
               alert(myJson.error ? myJson.error : myJson.message)
               
                
            }
        }).catch((error) => {
            // alert("login api error")
            alert("error in API")
            
    
               
        });
    }
    const changeCheckboxValue = (value) => {
        
        setWithdrawFilter(value);
        setTeachers("")
    }
    React.useEffect(() => {
        if(teachers == ""){
            getTeacherList(isWithdrawFilter)
        }
      },[teachers]);
    return(
        <div className="student-list-container">
                <div className="row d-flex justify-content-end">
                     <button type="button" className="btn button-bg " onClick={() => changeView("addTeacher", "")}>Add Teacher</button>
                </div>

                <SearchComponent callback={searchFilter} />

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
                {teachers &&  teachers.length > 0 ?
                    <table ref={componentRef} className="table table-striped">
                        <thead>
                             <tr>
                                <th scope="col"></th>
                                <th scope="col">Name</th>
                                <th scope="col">Father Name</th>
                                <th scope="col">Cnic</th>
                                <th scope="col">Dob</th>
                                <th scope="col">Address</th>
                                <th scope="col">Qualification</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        teachers &&  teachers.length > 0 ?
                        teachers.map((d,i) => {
                           return( <tr key={i}>
                                <td><img src={d.image_url == "" ? require("../images/avatar.png") : Constant.apiURl + d.image_url} style={{"height" : "49px", "width":"50px", borderRadius: "50%"}} /></td>
                                <td>{d.name}</td>
                                <td>{d.fatherName}</td>
                                <td>{d.cnic}</td>
                                <td>{d.dob}</td>
                                <td>{d.address}</td>
                                <td>{d.qualification}</td>
                                <td>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-secondary" onClick={() => changeView("viewTeacher", d)}>View</button>
                                    <button type="button" className="btn btn-secondary" onClick={() => changeView("editTeacher", d)}>Edit</button>
                                    
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
                    <h5>Teacher not found</h5>
                }
                </div>
            </div>
    )
}
const mapStateToProps = (state) => {
  
    return {
        addTeacherRes : state.teacherReducer,
    //   appLoader : state.appLevelReducer
    };
  };
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        teacherListReq: (data) => dispatch(teacherListReq(data)),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(TeacherList)