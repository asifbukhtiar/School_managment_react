import React from 'react';
import { Route, Switch, Link } from "react-router-dom";
import DashboardComponent from './components/dashboardComponent';
import LoginComponent from './components/loginComponent';
const ProtectedRoute = (props) => {
    
    return(
        <Route  path="/dashboard" component={DashboardComponent} /> 
    )
}
export default ProtectedRoute