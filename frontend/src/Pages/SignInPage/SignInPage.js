import React, {useState} from 'react'
import './SignInPage.scss'
import {Link, useNavigate}  from "react-router-dom";
import logo from '../../Assets/logo.png' 

export default function SignInPage() {

    const history = useNavigate()
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        fetch("http://localhost:5000/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
             console.log("error")
           }
           else{
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               history('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
  return (
    <div className='signinpage'>
        <div className='blur'></div>
        <form>
            <img src={logo}></img>
            <h4>Username : </h4>
            <input type='text' placeholder='Enter your username' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <h4>Password : </h4>
            <input type='password' placeholder='Enter your password' value={password} onChange={(e)=>setPasword(e.target.value)}></input>
            <button onClick={PostData} type="button">Sign In</button>
            <Link to='/signup'>Not a member? Sign up now</Link>
        </form>
    </div>
  )
}
