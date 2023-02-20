import React,{useState} from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

function Registration() {
  const navigate = useNavigate();
  const [input,setInput] = useState({
    name:'',
    email:'',
    password:'',
    cpassword:'',
    profilePic:''
  })
  const [errField,setErrField] = useState({
    nameErr:'',
    emailErr:'',
    passwordErr:'',
    cpasswordErr:''
  })
  const inputHandler=(e)=>{
    //console.log(e.target.name,'==',e.target.value);
    setInput({...input,[e.target.name]:e.target.value})
  }
  //console.log(input);
  const imageUpload =(event)=>{
    console.log(event.target.files[0]);
    setInput({...input,profilePic:event.target.files[0]})
  }
  const submitForm = async(e)=>{
    e.preventDefault()
    console.log(input);
    if(validateForm()){
      console.log('valid');
      let url = 'http://localhost:5000/user/addUser'
      let options={
        method:'POST',
        url:url,
        headers:{
          'Content-Type' : 'application/json',
        },
        data:input
      }
      const formdata = new FormData()
      formdata.append('image',input.profilePic,input.profilePic.name);
      formdata.append('name',input.name);
      formdata.append('email',input.email)
      formdata.append('password',input.password)
      formdata.append('cpassword',input.cpassword)
      try {
         //let response =await axios(options)
        let response =await axios.post(url,formdata)
        console.log(response);
        if(response.status==200){
          console.log('user added')
          toast.success("user added !", {
            position: toast.POSITION.TOP_CENTER
          });
          setTimeout(()=>{
            navigate('/login')
          },1500)
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went Wrong!", {
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
      nameErr:'',
      emailErr:'',
      passwordErr:'',
      cpasswordErr:''
    })
    if(input.name===''){
      isFormValid=false
      setErrField(prevState=>({
        ...prevState,nameErr:'please enter name'
      }))
    }
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
    // if(input.cpassword===''){
    //   isFormValid=false
    //   setErrField(prevState=>({
    //     ...prevState,cpasswordErr:'please confirm password'
    //   }))
    // }
    if(input.cpassword===''||input.cpassword!==input.password){
      isFormValid=false
      setErrField(prevState=>({
        ...prevState,cpasswordErr:'please confirm password'
      }))
    }
    return isFormValid;
  }
  return (
    <div className='container'>
      <h3 className='heading'>Registration</h3>
      <ToastContainer/>
      <form >
        <div>
          <label className='form-label'>username</label>
          <input type="text" name="name" id="" value={input.name} onChange={inputHandler}/>
          {
            errField.nameErr.length>0 && <span className='formvalidationError'>{errField.nameErr}</span>
          }
        </div>
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
        <div>
          <label className='form-label'>confirm password</label>
          <input type="text" name="cpassword" id="" value={input.cpassword} onChange={inputHandler}/>
          {
            errField.cpasswordErr.length>0 && <span className='formvalidationError'>{errField.cpasswordErr}</span>
          }
        </div>
        <div>
          <label className='form-label'>Profile Image</label>
          <input type="file" name="image" id="" onChange={imageUpload}/>
          {
            errField.cpasswordErr.length>0 && <span className='formvalidationError'>{errField.cpasswordErr}</span>
          }
        </div>
        <button className='btn btn-primary' onClick={submitForm}>register</button>
      </form>
        <NavLink to='/login'>Login</NavLink>
    </div>
  )
}

export default Registration