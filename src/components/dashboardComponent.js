import React from 'react';
import SideBarComponent from './sideBarComponent';
import HeaderComponent from './headerComponent';
import ContentComponent from './contentComponent';
import { getCookie, deleteAllCookies } from '../cookies';

class DashboardComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            viewType : "studentList",
            breadCrump : "Student",
            teacherObj : "",
            studentObj : "",
            students : [
                {"id" : "1","registration" : "1", "name" : "rameez ashraf", "fatherName" : "m ashraf", "class" : "8","withdraw" :"No", "dob" : "15-01-1989","fatherCnic" : "364033002324", "fatherPh" : "030098320923","bForm" : "123456565"},
                {"id" : "2","registration" : "2", "name" : "shoaib bhutto", "fatherName" : "bhutto", "class" : "8","withdraw" :"No", "dob" : "15-01-1989","fatherCnic" : "364033002324", "fatherPh" : "030098320923","bForm" : "123456565"}
            ],
            teachers : [
                {"id" : "1", "name" : "rameez ashraf", "fatherName" : "m ashraf", "dob" : "15-01-1989", "joiningDate" : "15-01-1989","cnic" : "364033002324", "ph" : "030098320923","salary" : "30000", "qualification" :"master","address" :"pakistan"},
                {"id" : "2", "name" : "shoaib bhutto", "fatherName" : "bhutto", "dob" : "15-01-1989","joiningDate" : "15-01-1989","cnic" : "364033002324", "ph" : "030098320923","bForm" : "30000", "qualification" :"master","address" :"pakistan"}
            ]
        };
    }
    componentDidMount(){
        let accessToken = getCookie("access_token");
        if(accessToken == ""){
            this.props.history.push("/")
        }
    }
    changeView = (type, data) => {
        
        let cramp = this.state.breadCrump;
        if(type == "studentList"){
            cramp = "Student"
        }
        else if(type == "addStudent"){
            cramp = "Student / Add Student"
        }
        else if(type == "viewStudent"){
            cramp = "Student / View";
            this.setState({
                studentObj : data
            })
        }
        else if(type == "addStudentFee"){
            cramp = "Student / Add Fee";
            this.setState({
                studentObj : data
            })
        }
        else if(type == "viewStudentFee"){
            cramp = "Student / Fee";
            this.setState({
                studentObj : data
            })
        }
        else if(type == "addTeacher"){
            cramp = "Teacher / Add Teacher"
        }
        else if(type == "teacherList"){
            cramp = "Teacher"
        }
        else if(type == "viewTeacher"){
            cramp = "Teacher / View"
            this.setState({
                teacherObj : data
            })
        }
        else if(type == "editStudent"){
            cramp = "Student / Edit Student"
            this.setState({
                studentObj : data
            })
        }
        else if(type == "editTeacher"){
            cramp = "Teacher / Edit Teacher"
            this.setState({
                teacherObj : data
            })
        }
        else if(type == "changePassword"){
            cramp = "Change Password"
        }
        else{
            cramp = ""
        }
        this.setState({
            viewType : type,
            breadCrump : cramp,
            
        })
    }
    logout = () => {
        
        deleteAllCookies()
        this.props.history.push("/")
    }
  render(){
      return (
        <div id="wrapper">
            <SideBarComponent fun={this.changeView}  />
            <div className="content-page">
            <div className="topbar-wrapper">
                <HeaderComponent view={this.state.viewType} breadCrump={this.state.breadCrump} logout={this.logout} />
            </div>
            <div className="content-wrapper">
                <ContentComponent studentObj={this.state.studentObj} view={this.state.viewType}  dataObj={this.state.teacherObj} fun={this.changeView} students={this.state.students} teachers={this.state.teachers} />
            </div>
            </div>
      
         </div>
      
    );
  }
  
}

export default DashboardComponent;
