import React,{useContext} from 'react'
import { NavLink ,useNavigate} from 'react-router-dom'
import Context from '../store/Context'

function Nav() {
  const {state,dispatch} = useContext(Context)
  const navigate = useNavigate()
  const logout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  console.log(state);
  return (
   <div className='ulNav'>
     <ul>
        <li><NavLink to='/home' >home</NavLink></li>
        <li><NavLink to='/login' >login</NavLink></li>
        <li><NavLink to='/register'>registration</NavLink></li>
        <li style={{float:'right'}}><button className='btn btn-warning' onClick={logout}>logout</button></li>
        <li style={{float:'right'}}><NavLink to='/'>Hello {state.name}</NavLink></li>
    </ul>
   </div>
  )
}

export default Nav