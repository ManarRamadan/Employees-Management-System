import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router";
import { Link } from "react-router-dom";
import Layout from "./containers/Layout";
import Employees from './containers/Employees'


class Routes extends Component {
  ErrorPage = () => (
    <h1>
      Error 404 go to <Link to="/employees">Employees</Link>
    </h1>
  );
  render() {
    return (
      <div id="content" className={this.props.mode}>
        <Layout onThemeChange={this.props.onThemeChange} >
          <Switch>
            <Route exact path="/employees" component={Employees} />
            <Route component={this.ErrorPage} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default withRouter(Routes);
