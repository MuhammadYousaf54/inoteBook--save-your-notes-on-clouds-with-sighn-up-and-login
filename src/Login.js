import React ,{useState} from "react";
import { useNavigate } from 'react-router-dom'
const Login =(props) => {
  const navigate  = useNavigate();
  const [credentials, setCredentials] = useState({name:"",email:"",password:""})
  const handleSubmit = async  (e)=>{
  e.preventDefault();
  const response = await fetch(`http://localhost:5000/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
   body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
  });
  const json = await response.json();
  console.log(json);
  if(json.success){
   localStorage.setItem("token",json.authtoken);
   navigate("/");
   props.showAlert("login Successfully" , "success");

  }else{
    props.showAlert("invalid Credentials" , "warning");

  }
  }
  const onChange = (e)=>{
   setCredentials({...credentials ,[e.target.name]: e.target.value});
  }
  return (
      <div className="container">
        <h1 className="mb-3"> Enter Your Email For Login </h1>
      <form onSubmit={handleSubmit} >
      <div className="form-outline mb-4">
        <input type="email" id="email" name="email" className="form-control" onChange={onChange} />
        <label className="form-label" htmlFor="email" value={credentials.email} >
          Email address
        </label>
      </div>
      <div className="form-outline mb-4">
        <input type="password" id="password" name ="password"className="form-control" onChange={onChange} />
        <label className="form-label" htmlFor="password" value={credentials.password} >
          Password
        </label>
      </div>
      <button type="submit" className="btn btn-primary btn-block mb-4" >
        Submit
      </button>
    </form>
    </div>
  );
};

export default Login;
