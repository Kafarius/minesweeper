import React, {useState} from 'react';
import classes from '../css/Landing.module.css';
import UserNotification from "./userNotification";
import {useDispatch, } from "react-redux";
import { userActions } from "../store/user-slice";

const Landing = () => {
    const [user, setUser] = useState({
        loginUsername: '',
        loginPass: '',
        signupUsername: '',
        signupPass:'',
    })
    const dispatch = useDispatch();
    const onChangeHandler = (event) => {
        switch (event.target.id) {
            case 'login_username': {
                setUser({...user, loginUsername: event.target.value});
                break;
            }
            case 'login_pass': {
                setUser({...user, loginPass: event.target.value});
                break;
            }
            case 'signup_username': {
                setUser({...user, signupUsername: event.target.value});
                break;
            }
            case 'signup_pass': {
                setUser({...user, signupPass: event.target.value});
                break;
            }
        }
    };
    const signupHandler = (event) => {
        event.preventDefault();
        dispatch(userActions.addUser({
            username: user.signupUsername,
            password: user.signupPass,
            time: null
        }));
    };
    const loginHandler = (event) => {
        event.preventDefault();
        dispatch(userActions.loginUser({
            username: user.loginUsername,
            password: user.loginPass,
        }));
    };

    return (
            <div className={classes.landing}>
                <div className={classes.landingForms}>
                    <form className={classes.loginForm}>
                        <h3>Login</h3>
                        <i>If you have an account, login here.</i>
                        <input required id='login_username' onChange={onChangeHandler} type={"text"} placeholder={"Username"}/>
                        <input required id='login_pass'  onChange={onChangeHandler}  type={"password"} placeholder={"Password"}/>
                        <button onClick={loginHandler}>LOGIN</button>
                    </form>

                    <form className={classes.signupForm}>
                        <h3>Sign Up</h3>
                        <i>If you don't have an account, sign up here.</i>
                        <input maxLength={10} required id='signup_username'  onChange={onChangeHandler}  type={"username"} placeholder={"Username"}/>
                        <input required id='signup_pass'  onChange={onChangeHandler}  type={"password"} placeholder={"Password"}/>
                        <button onClick={signupHandler}>SIGN UP</button>
                    </form>
                </div>
                <UserNotification/>
            </div>

    );
};

export default Landing;