import React from "react";
import { loginReq } from "../actions/userAction";
import {connect} from "react-redux";
import { getCookie } from "../cookies";
class LoginComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            email : "",
            password : "",
            errorMsg : "",
            errorType : ""
            
        }
    }
    componentDidMount(){
        let accessToken = getCookie("access_token");
        if(accessToken != ""){
            this.props.history.push("/dashboard")
        }
    }
    gotoDashboard = () =>{
        this.props.history.push("/dashboard")
    }
    rersetState = () => {
        this.setState({
            errorMsg : ""
        })
    }
    validation = () => {
        if(this.state.email == ""){
            this.setState({
                errorMsg : "Please enter email",
                errorType : "danger"
            })
        }else if(this.state.password == ""){
            this.setState({
                errorMsg : "Please enter password",
                errorType : "danger"
            })
        }else{
            let data ={
                email : this.state.email,
                password : this.state.password
            }
            this.props.loginReq(data)
        }
    }
    componentWillReceiveProps(nextProps){
        
        console.log(nextProps)
        if(nextProps && nextProps.loginRes && nextProps.loginRes.success == 0 ){
            this.setState({
                errorMsg : nextProps.loginRes.message,
                errorType : "danger"
            })
        }
        else if(nextProps && nextProps.loginRes && nextProps.loginRes.success == 1 ){
            this.setState({
                errorMsg : nextProps.loginRes.message,
                errorType : "success"
            },() => {
                setTimeout(
                    () => this.gotoDashboard(), 
                    3000
                  );
              
            })
        }
    }
    render(){
        return(
            <div className="login-wrapper d-flex align-items-center justify-content-center">
                <div className="container shadow  rounded p-4 ">
                    <div className="login-container">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" onChange={(e) => this.setState({email : e.target.value}, this.rersetState())} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" onChange={(e) => this.setState({password : e.target.value}, this.rersetState())} id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            {this.state.errorMsg != "" ? 
                                <div className={`alert alert-${this.state.errorType}`} role="alert">
                                    {this.state.errorMsg}
                                </div>
                            :""}
                            <button type="button" className="btn button-bg " onClick={this.validation}>Login</button>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    
      return {
          loginRes : state.userReducer,
      };
    };
const mapDispatchToProps = (dispatch) => {
      // Action
      return {
        loginReq: (data) => dispatch(loginReq(data)),
      };
    };
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)