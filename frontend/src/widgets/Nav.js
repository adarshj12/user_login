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
  const value=localStorage.getItem('token')
  console.log(state);
  return (
   <div className='ulNav'>
     <ul>
        {!value?<li><NavLink to='/login' >login</NavLink></li>:''}
        {!value?<li><NavLink to='/register'>registration</NavLink></li>:''}
      { value ?
      <li style={{float:'right'}}><button className='btn btn-warning' onClick={logout}>logout</button></li>:''}
       { value ?
      <li style={{float:'right'}}><NavLink to='/'>Hello {state.name}</NavLink></li>:''}
        
        
    </ul>
   </div>
  )
}

export default Nav