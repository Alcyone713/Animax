import React, { useState } from 'react'
import './SignUpPage.scss'
import { Link, useNavigate } from "react-router-dom";
import logo from '../../Assets/logo.png' 

export default function SignUpPage() {

    const [name, setName] = useState("")
    const [password, setPasword] = useState("")
    const [email, setEmail] = useState("")

    const history = useNavigate();
    const PostData = () => {
        fetch("http://localhost:5000/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email,
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log("Error")
                }
                else {
                    history('/signin')
                }
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <div className='signuppage'>
                <div className='blur'></div>
                <form>
                    <img src={logo}></img>
                    <h4>Name : </h4>
                    <input type='text' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)}></input>
                    <h4>Username : </h4>
                    <input type='text' placeholder='Enter your username' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <h4>Password : </h4>
                    <input type='password' placeholder='Enter your password' value={password} onChange={(e) => setPasword(e.target.value)}></input>
                    <button onClick={PostData} type="button">Sign Up</button>
                    <Link to='/signin'>Already a member? Sign In</Link>
                </form>
            </div>
        </div>
    )
}
