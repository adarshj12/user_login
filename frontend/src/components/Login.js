import React,{useState} from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [input,setInput] = useState({
    email:'',
    password:''
  })
  const [errField,setErrField] = useState({
    emailErr:'',
    passwordErr:'',
  })
  const inputHandler=(e)=>{
    //console.log(e.target.name,'==',e.target.value);
    setInput({...input,[e.target.name]:e.target.value})
  }
  const submitForm = async(e)=>{
    e.preventDefault()
    console.log(input);
    if(validateForm()){
      console.log('valid');
      let url = 'http://localhost:5000/user/login'
      let options={
        method:'POST',
        url:url,
        headers:{
          'Content-Type' : 'application/json',
        },
        data:input
      }
      try {
        let response =await axios(options)
        console.log(response);
        console.log(response.data);
        console.log(response['data'].message.token);
        if(response['data'].message.token){
          console.log('hi');
          toast.success("Login Successfull !");
          console.log(response['data']);
          localStorage.setItem('token',response['data'].message.token)
          setTimeout(()=>{
            navigate('/home')
          },1500)
        }else{
          toast.error("Invalid Entry !");
        }
      } catch (error) {
        console.log(error);
        toast.error('invalid entry', {
          position: toast.POSITION.TOP_LEFT
        });
      }
    }else{
      console.log('invalid entry');
    }
  }
  
  const validateForm =()=>{
    let isFormValid=true;
    setErrField({
      emailErr:'',
      passwordErr:''
    })
    if(input.email===''){
      isFormValid=false
      setErrField(prevState=>({
        ...prevState,emailErr:'please enter email'
      }))
    }
    if(input.password===''){
      isFormValid=false
      setErrField(prevState=>({
        ...prevState,passwordErr:'please enter password'
      }))
    }
    return isFormValid;
  }
  return (
    <div className='container'>
    <h3 className='heading'>Login</h3>
    <ToastContainer/>
    <form action="" method='post'>
    <div>
          <label className='form-label'>email</label>
          <input type="text" name="email" id="" value={input.email} onChange={inputHandler} />
          {
            errField.emailErr.length>0 && <span className='formvalidationError'>{errField.emailErr}</span>
          }
        </div>
        <div>
          <label className='form-label'>password</label>
          <input type="text" name="password" id="" value={input.password} onChange={inputHandler} />
          {
            errField.passwordErr.length>0 && <span className='formvalidationError'>{errField.passwordErr}</span>
          }
        </div>
        <button className='btn btn-primary' onClick={submitForm}>login</button>
    </form>
  </div>
  )
}

export default Login