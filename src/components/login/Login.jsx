import React, { useEffect, useState } from 'react'
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Login() {

  useEffect(()=>{
    sessionStorage.clear()
  })

  const[username , setUsername]=useState('')
  const[password , setPassword]=useState('')

  const navigate = useNavigate()

  const ProceedLogin =(e)=>{
    e.preventDefault();
    if(validate()){
      fetch(`https://registeredusers.onrender.com/user/?username=${username}`)
      .then((res)=>{
        // console.log(res)
        return res.json();
      }).then((resp)=>{
        console.log(resp)
        if(Object.keys(resp).length === 0){
          toast.error("please enter valid username")
        }
        else{
          if(resp[0].password === password){
            toast.success('Login Successful')
            sessionStorage.setItem('username',username);
            navigate('/')
          }
          else{
            toast.error('Please Enter Valid Credentials')
          }
        }
      }).catch((err)=>{
        toast.error('Login Failed due to :' + err.message)
      })

    }
  }

  const validate = ()=>{
    let result = true;
    if(username === null || username === ''){
      result = false;
      toast.warning('Please Enter Username')
    }
    if(password === null || password === ''){
      result = false;
      toast.warning('Please Enter password')
    }
    return result
  }

  return (
    <div className='login'>
      <form action="" onSubmit={ProceedLogin}>
            <h1>User Login</h1>
            <div className='formInputs'>
            <div className='inputField'>
                <label htmlFor="">Username: <span>*</span> </label>
                <input value={username} 
                onChange={e => setUsername(e.target.value)} 
                type="text" 
                placeholder='Enter Userame' />
            </div>
            <div className='inputField'>
                <label htmlFor="">Password: <span>*</span> </label>
                <input value={password} 
                onChange={e => setPassword(e.target.value)} 
                type="password" 
                placeholder='Enter Pasword' />
            </div>
            </div>
            
            <button type='submit'>Login</button>
            <Link className='Link' to={'/register'}>+ New User</Link>
            

        </form>
    </div>
  )
}

export default Login