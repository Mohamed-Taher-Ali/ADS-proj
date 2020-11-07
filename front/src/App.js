import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom"

import { login } from './services';

import Container from "./components/Container"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Advertisers from "./pages/Advertisers"
import CatsAndTags from "./pages/CatsAndTags"

import 'bootstrap/dist/css/bootstrap.css';
import "react-datetime/css/react-datetime.css";
import "./custom.css"


function App() {

  return (
    <Router>
      <Switch>{
        (localStorage.getItem("ads") && localStorage.getItem("ads") != "null") ?
          // user.token?
          <PrivateRoute path='/' /> :
          <>
            <Route path="/login" exact component={() => <Login />} />
            <Redirect to='/login' />
          </>
      }
      </Switch>
    </Router>
  );
}

const PrivateRoute = () => {

  let token = localStorage.getItem("ads"),
    [user, setUser] = useState(false),
    [admin, setAdmin] = useState(false)

  useEffect(() => {
    (async () => {
      let tryLogin = await login({ token })
      setUser(tryLogin.data)
      setAdmin(tryLogin.data.role == "adm")
    })()
  }, [])

  return !user ? <div>Loading...</div> : (
    <Router>
      <Switch>
        <Container user={user}>
          <Route path="/dashboard" component={(props) => <Dashboard {...props} user={user} />} />
          <Route path="/own" component={(props) => <Dashboard {...props} user={user} />} />
          <Route path="/(cats|tags)/" component={(props) => <CatsAndTags {...props} user={user} />} />
          {admin && <Route path="/advertisers" component={(props) => <Advertisers {...props} user={user} />} />}
          <Redirect to='/dashboard' />
        </Container>
      </Switch>
    </Router>
  );
}


export default App;
