import React from 'react';
import MyButton from '../utils/button';
import Login from './login'

const RegisterLogin = () => {
    return (
        <div className="page-container">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>New Customer</h1>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
                        <MyButton 
                            type="default"
                            title="Create an account"
                            linkto="/register"
                            addStyles={{
                                margin:'10px 0 0 0'
                            }}
                        />
                    </div>
                    <div className="right">
                        <h2>Registered customers</h2>
                        <p>If you have an account please login</p>
                        <Login />
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default RegisterLogin