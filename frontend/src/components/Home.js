import React,{useEffect,useContext,useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Context from '../store/Context';
import { imageUrl } from '../Constants/constants';
// const jwt = require('jsonwebtoken')

function Home() {
  const {state,dispatch} = useContext(Context)
  const  navigate = useNavigate()
  const [image,setImage]=useState('')
    const handleChange=(e)=>{
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    }
    console.log(image);
    const handleApi =async()=>{
        const url = 'http://localhost:5000/user/imageUpload';
        let token =localStorage.getItem('token');
        const formData=new FormData();
        formData.append('image',image);
        let imgResponse =await axios.post(`${url}/${token}`,formData)
        console.log(imgResponse);
    }
  const [imagePath,setImagePath] = useState('')
  const [info,setInfo]=useState({
    name:'',
    email:''
  })
 
    const getUserDetails =async()=>{
    console.log('this is home page',localStorage.getItem('token'));
    if(!localStorage.getItem('token')) navigate('/login')
    console.log('valid');
    let url = 'http://localhost:5000/user/list'
    let options={
      method:'GET',
      url:url,
      headers:{
        'Authorization' : `Bearer ${localStorage.getItem('token')}`,
      }
    }
    try {
      let response = await axios(options)
      console.log(response);
      console.log('hi',response.data['currentUser']);
      console.log('hello',response.data['userData'].profile);
      //dispatch({type:'UPDATE_NAME',payload:info.name})
      setInfo({
        name:response.data['currentUser'].name,
        email:response.data['currentUser'].email
      })
      dispatch({type:'UPDATE_NAME',payload:info.name})
      setImagePath(imageUrl+response.data['userData'].profile)
      console.log(response.data);
    } catch (error) {
      console.log(error);;
      navigate('/login')
    }
  }
  useEffect(()=>{
    getUserDetails()
  },[])
  return (
    <div className='container'>
    <div className="container emp-profile">
            <div class="container">
                <div class="row gutters">
                    <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div class="card h-100">
                            <div class="card-body">
                                <div class="account-settings">
                                    <div class="user-profile">
                                        <div class="user-avatar">
                                            <img  style={{width:'200px'}} src={imagePath}/>
                                        </div>
                                        <div  >
                                            
                                            <input type="file" name="image" id=""  onChange={handleChange} />
                                            <button className='btn btn-primary' onClick={handleApi}    >Change Photo</button>
                                        </div>
                                        <h5 class="user-name"></h5>
                                    </div>
                                    <div class="about">
                                        <h5>About</h5>
                                        <p>I'm {info.name}. Full Stack developer I enjoy creating user-centric, delightful applications.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div class="card h-100">
                            <div class="card-body">
                                {/* <div class="row gutters">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 class="mb-2 text-primary">Personal Details</h6>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="fullName">Full Name</label>
                                            <input type="text" class="form-control" id="fullName" placeholder="Enter full name" />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="eMail">Email</label>
                                            <input type="email" class="form-control" id="eMail" placeholder="Enter email ID" />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="phone">Phone</label>
                                            <input type="text" class="form-control" id="phone" placeholder="Enter phone number" />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="website">Website URL</label>
                                            <input type="url" class="form-control" id="website" placeholder="Website url" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row gutters">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 class="mt-3 mb-2 text-primary">Address</h6>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="Street">Street</label>
                                            <input type="name" class="form-control" id="Street" placeholder="Enter Street" />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="ciTy">City</label>
                                            <input type="name" class="form-control" id="ciTy" placeholder="Enter City" />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="sTate">State</label>
                                            <input type="text" class="form-control" id="sTate" placeholder="Enter State" />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group">
                                            <label for="zIp">Zip Code</label>
                                            <input type="text" class="form-control" id="zIp" placeholder="Zip Code" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row gutters">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="text-right">
                                            <button type="button" id="submit" name="submit" class="btn btn-secondary">Cancel</button>
                                            <button type="button" id="submit" name="submit" class="btn btn-primary">Update</button>
                                        </div>
                                    </div>
                                </div> */}
                                <div class="row gutters">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="text-right">
                                          <h4 style={{color:'blue'}}>Name:<em style={{color:'grey'}}>{info.name}</em></h4> 
                                        </div>
                                        <div class="text-right">
                                          <h4 style={{color:'blue'}}>e-mail ID:<em style={{color:'grey'}}>{info.email}</em></h4> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
  </div>
    
  )
}

export default Home