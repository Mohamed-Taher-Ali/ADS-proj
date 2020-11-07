import React, {useState, useEffect} from 'react';
import { Button, FormGroup, Input} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { login } from '../services';



export default function Login() {
    let history =useHistory(),
        [info, setInfo] = useState({});


    let inputChangeHandler = (e) => setInfo({
        ...info,
        [e.target.name]: e.target.value
    })

    let buttonClickHandler = async () => {
        let loginCase = await login(info);

        if(loginCase?.data.token){
            let user = loginCase.data
            localStorage.setItem("ads",user.token)
            history.go("/dashboard")
        }
    }

    return (
        <div className="contain">
            <div className="loginExt">
                <div className="loginRightBorder">
                    <div className="bTop"></div>
                    <div className="bRight"></div>
                </div>
                <div className="loginInt">
                    <div>
                        <FormGroup>
                            <Input type="text" name="name" onChange={inputChangeHandler} placeholder="Enter Username" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" name="password" onChange={inputChangeHandler} placeholder="Enter Password" />
                        </FormGroup>
                    </div>
                    <div>
                        <Button color="primary" onClick={buttonClickHandler}>Login</Button>
                    </div>
                </div>
                <div className="loginLefttBorder">
                    <div className="bLeft"></div>
                    <div className="bBottom"></div>
                </div>
            </div>
        </div>
    );
}

