import React, { useEffect } from 'react'
import './Home.css'
import {Link, useNavigate} from'react-router-dom'
import Todo from '../Todo/Todo'

function Home() {
  const navigate = useNavigate()
  useEffect(()=>{
    let username = sessionStorage.getItem('username');
    if(username === ''||username === null){
      navigate('/login');
    }
  },[])
  return (
    <div className='app'>
      <header>
        <h5>TODO.</h5>
        <div className='headerLinks'>
        <Link className='headerlink' to={'/'}>Home</Link>
        <Link className='headerlink' to={'/login'}>LogOut</Link>
        </div>
      </header>
      <Todo/>
      
    </div>
  )
}

export default Home