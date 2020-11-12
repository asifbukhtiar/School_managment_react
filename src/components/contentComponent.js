import React from"react";
import AddStudent from "./addStudent";
import StudentList from "./studentList";
import TeacherList from "./teacherList";
import AddTeacher from "./addTeacher";
import ViewStudent from "./viewStudent";
import ViewTeacher from "./viewTeacher";
import EditTeacher from "./editTeacher";
import EditStudent from "./editStudent";
import AddStudentFee from "./addFeeStudent";
import EditStudentFee from "./editFeeStudent";
import ViewStudentFee from "./viewFeeStudent";
import ChangePasswordComponent from "./changePasswordComponent";
const ContentComponent = (props) => {
   
    return(
    <div className="content">
        <div className="container-fluid">
            {props.view == "studentList" ? 
                <StudentList fun={props.fun} />
                :
                props.view == "addStudent" ? 
                <AddStudent fun={props.fun}/>
                :
                props.view == "teacherList" ? 
                <TeacherList fun={props.fun} data={props.teachers}/>
                :
                props.view == "addTeacher" ? 
                <AddTeacher fun={props.fun}/>
                :
                props.view == "viewStudent" ? 
                <ViewStudent fun={props.fun} data={props.studentObj}/>
                :
                props.view == "addStudentFee" ? 
                <AddStudentFee fun={props.fun} data={props.studentObj}/>
                :
                props.view == "viewStudentFee" ? 
                <ViewStudentFee fun={props.fun} data={props.studentObj}/>
                :
                props.view == "viewTeacher" ? 
                <ViewTeacher fun={props.fun} data={props.dataObj}/>
                :
                props.view == "editTeacher" ? 
                <EditTeacher  fun={props.fun} data={props.dataObj}/>
                :
                props.view == "editStudent" ? 
                <EditStudent  fun={props.fun} data={props.studentObj}/>
                :
                props.view == "changePassword" ? 
                <ChangePasswordComponent fun={props.fun} />
                :
                ""
            }
        </div>
       
    </div>
    )
}
export default ContentComponent