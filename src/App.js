import React from 'react';
import LoginComponent from './components/loginComponent';
import { Route, Switch, Link } from "react-router-dom";
import { connect } from 'react-redux';
import DashboardComponent from './components/dashboardComponent';
class App extends React.Component{
  render(){
      return (
        <Switch>
          <Route exact path="/" component={LoginComponent} />
          <Route  path="/dashboard" component={DashboardComponent} />
        </Switch>
      
    );
  }
  
}

export default App;
