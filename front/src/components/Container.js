import React, { useState, useEffect } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap'
import {Link, useHistory} from "react-router-dom"
import { login } from '../services';


export default function Container({children, user}) {

    let history = useHistory(),
        role = user.role

    let logoutClickHandler = async () => {
        localStorage.removeItem("ads")
        history.go("/login")
    }


return (
    <div className="cont">
    <div className="hCont">
        <div className="hContL">
            <strong style={{color: "white"}}>ADS</strong>
            <div style={{margin: "0px 50px"}}>
            <Link to="/dashboard" className="btn btn-warning" >Dashboard</Link>
            <Link to="/own" className="btn btn-warning" >own</Link>
            <Link to="/tags" className="btn btn-warning" >tags</Link>
            <Link to="/cats" className="btn btn-warning" >cats</Link>
            {role == "adm" && <Link to="/advertisers" className="btn btn-warning" >advertisers</Link>}
            </div>
        </div>
        <Button onClick={logoutClickHandler} >Logout</Button>
    </div>
    <div className="bod">
        {children}
    </div>
</div>
)
}