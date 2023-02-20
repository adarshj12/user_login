import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import {Routes, Route,useNavigate,useParams} from 'react-router-dom';
import Nav from './widgets/Nav';
import './App.css';
import {Provider} from './store/Context';
import { useReducer } from 'react';
import { initialState,reducer } from './store/userReducer';

// const NavHideComp=(props)=>{
//   const  {location} =props;
//   console.log(location);
//   return (
//     'asdfasd'
//   )
// }


//  const NavHide = withRouter()


function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <div className="App"> 
    <Provider value={{state,dispatch}}>
    <Nav></Nav>
    {/* <NavHideComp/> */}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Registration/>}/>
    </Routes>
    </Provider>
    </div>
  );
}

export default App;
